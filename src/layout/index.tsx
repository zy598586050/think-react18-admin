import React from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Header from './components/header'
import Menu from './components/menu'

const { Sider, Content } = Layout

const Index = () => {
    const app = useSelector((state: any) => state.app)
    return <Layout>
        {/* 左侧菜单 */}
        <Sider className='h-screen' trigger={null} collapsible collapsed={app.collapsed}>
            <div className='text-[18px] text-cool-[#fff] py-[16px] text-center'>
                TRA
            </div>
            {/* 菜单栏 */}
            <Menu />
        </Sider>
        {/* 右侧内容 */}
        <Layout className='bg-cool-[#fff]'>
            {/* 顶部导航 */}
            <Header />
            {/* 内容区 */}
            <Content className='p-[15px]'>
                <Outlet />
            </Content>
        </Layout>
    </Layout>
}

export default Index