import React from 'react'
import { Navigate, useRoutes, RouteObject } from "react-router-dom"
import lazyLoad from './lazyLoad'
import storage from '@/utils/localStorage'

export const router: RouteObject[] = [
    {
        path: '/login',
        element: lazyLoad(React.lazy(() => import('@/views/login')))
    },
    {
        path: '*',
        element: <Navigate to='/404' />
    },
    {
        path: '/',
        element: <Navigate to='/home' />
    },
    {
        path: '/',
        element: lazyLoad(React.lazy(() => import('@/layout'))),
        children: [
            {
                path: 'home',
                element: lazyLoad(React.lazy(() => import('@/views/home'))),
                index: true,
            },
            {
                path: '404',
                element: lazyLoad(React.lazy(() => import('@/views/home/404')))
            }
        ]
    }
]

// 动态路由
const loadAsyncRoutes = () => {
    const locState = JSON.parse(storage.getItem('userInfo') || '{}')
    if (locState?.token) {
        try {
            const getMenuAuth = locState.menu_tree
            // 递归加载component
            const deep = (item: any) => {
                return item.map((v: any) => {
                    let url = v.component ? `../views/${v.component}` : '../components/outlet'
                    const obj: any = {
                        path: v.path,
                        meta: {
                            ...v.meta,
                            icon: v.icon,
                        },
                        element: lazyLoad(React.lazy(() => import(/* @vite-ignore */url))),
                    }
                    if (v.children && v.children.length > 0) {
                        obj['children'] = deep(v.children)
                    }
                    return obj
                })
            }
            getMenuAuth && deep(getMenuAuth).forEach((v: any) => {
                router[3].children?.push(v)
            })
        } catch (error) {
            console.log(error)
        }
    }
}
loadAsyncRoutes()

export default () => {
    return useRoutes(router)
}