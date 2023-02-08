import React, { useState } from 'react'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Col, Row, Form, Input, Button } from 'antd';
import { useDispatch } from 'react-redux'
import { setUserInfo } from '@/store/module/user'
import { login } from './service'
import { useEventListener } from 'ahooks'

const Index = () => {
    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState<boolean>(false)
    const onSubmit = () => {
        setLoading(true)
        form.validateFields().then((values: any) => {
            login(values).then((result: any) => {
                const { data } = result
                dispatch(setUserInfo({
                    token: data.token,
                    name: data.name,
                    avatar: data.avatar,
                    auth_array: data.auth_array,
                    menu_tree: data.menu_tree
                }))
                window.location.replace('/')
            })
        }).catch(() => {
            setLoading(false)
        })
    }
    useEventListener('keydown', (ev: any) => {
        if (ev.keyCode === 13) {
            onSubmit()
        }
    })
    return <>
        <Row className='min-h-screen bg-indigo-500'>
            <Col lg={16} md={12} className='flex items-center justify-center'>
                <div>
                    <div className='font-bold text-5xl text-light-50 mb-4'>欢迎使用</div>
                    <div className='text-gray-200 text-lg'>此管理系统是基于React18+TS+Windicss+ReduxToolkit+Vite开发</div>
                </div>
            </Col>
            <Col lg={8} md={12} className='flex items-center justify-center bg-light-50 flex-col'>
                <h2 className='font-bold text-4xl text-gray-800'>ThinkReact18Admin</h2>
                <div className='flex items-center justify-center my-5 text-gray-300 space-x-2'>
                    <span className="h-[1px] w-16 bg-gray-200"></span>
                    <span>账号密码登录</span>
                    <span className="h-[1px] w-16 bg-gray-200"></span>
                </div>
                <Form form={form}>
                    <Form.Item name="username" rules={[{ required: true, message: '请输入账号' }]}>
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder='请输入账号' />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
                        <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder='请输入密码' />
                    </Form.Item>
                    <Form.Item>
                        <Button className='w-[250px] bg-indigo-500' type='primary' loading={loading} onClick={onSubmit}>登录</Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    </>
}

export default Index