

import React, { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import storage from '@/utils/localStorage'

interface Props {
    children: ReactNode
}

const Auth = ({ children }: Props) => {
    const locState = JSON.parse(storage.getItem('userInfo') || '{}')
    const { pathname } = useLocation()
    if (locState?.token) {
        if (pathname === '/login') { return <Navigate to='/' /> }
        return <>{children}</>
    } else {
        if (pathname === '/login') { return <>{children}</> }
        return <Navigate to='/login' />
    }
}

export default Auth