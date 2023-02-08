import React from 'react'
import { Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
import Icon from '@/components/icon'
import { router } from '@/router'

// 路由转菜单
const getMenu = (item: any) => {
    const newArr = item.filter((v: any) => v.hidden !== true)
    return newArr.map((v: any) => {
        const obj: any = {
            key: v.path,
            icon: v?.meta?.icon ? <Icon name={v?.meta?.icon} /> : null,
            label: v.meta?.title
        }
        if (v.children && v.children.length > 0) {
            obj['children'] = getMenu(v.children)
        }
        return obj
    })
}

// 获取菜单
const items = getMenu(router[3].children?.filter((v: any) => v.path !== 'home' && v.path !== '404'))

const MenuBox = () => {
    const navigate = useNavigate()
    // 路由跳转
    const navGo = (e: any) => {
        navigate(e.key)
    }
    return <Menu
        mode='inline'
        theme='dark'
        items={items}
        onClick={navGo}
    >
    </Menu>
}

export default MenuBox