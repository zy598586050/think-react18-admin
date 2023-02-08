

import React, { useEffect, useState } from 'react'
import { Layout, Dropdown, Menu, Modal, Input, Button, Form, Breadcrumb, Popconfirm } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { openOrClose } from '@/store/module/app'
import { setUserInfo } from '@/store/module/user'

interface IBC {
    name: string;
    path: string;
    type: number;
}

const Header = () => {
    const [form1] = Form.useForm()
    const app = useSelector((state: any) => state.app)
    const user = useSelector((state: any) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [isShowEditPass, setIsShowEditPass] = useState<boolean>(false)
    const [breadCrumb, setBreadCrumb] = useState<IBC[]>([])
    // 折叠菜单
    const toggle = () => {
        dispatch(openOrClose(!app.collapsed))
    }
    // 关闭修改密码弹窗
    const closePass = () => {
        setIsShowEditPass(false)
        form1.setFieldsValue({
            resetText: ''
        })
    }
    // 修改密码提交
    const resetSubmit = () => {
        form1.validateFields().then(result => {
            console.log(result)
            closePass()
        })
    }
    // 退出登录
    const logout = () => {
        dispatch(setUserInfo({
            name: '',
            avatar: '',
            token: '',
            auth_array: '',
            menu_tree: ''
        }))
        navigate('/login')
    }
    // 动态递归获取面包屑
    const getBreadCrumb = () => {
        const bcArr = location.pathname.split('/')
        const arr: IBC[] = []
        const deep = (item: any) => {
            item.forEach((v: any) => {
                if (bcArr.indexOf(v.name) >= 0) {
                    arr.push({
                        name: v.meta.title,
                        path: v.path,
                        type: v.type,
                    })
                }
                if (v.children && v.children.length > 0) {
                    deep(v.children)
                }
            })
        }
        user.menu_tree && deep(user.menu_tree)
        setBreadCrumb(arr)
    }
    // 监听路由变化
    useEffect(() => {
        getBreadCrumb()
    }, [location])
    return <Layout.Header className='flex justify-between items-center !px-5'>
        <Modal
            title='重置密码'
            visible={isShowEditPass}
            onCancel={closePass}
            maskClosable={false}
            footer={<>
                <Button type='ghost' onClick={closePass}>取消</Button>
                <Popconfirm
                    onConfirm={resetSubmit}
                    title="您确定要重置密码吗？"
                    cancelText="取消"
                    okText="确定"
                >
                    <Button type='primary'>确定</Button>
                </Popconfirm>
            </>}
        >
            <Form form={form1}>
                <Form.Item
                    name='resetText'
                    rules={[
                        { required: true, message: '密码不能为空' },
                        {
                            validator: (rule, value, fn) => {
                                if (/^[\w_\.\-]{1,18}$/.test(value)) {
                                    fn()
                                } else {
                                    fn('密码格式不正确')
                                }
                            }
                        }
                    ]}
                >
                    <Input placeholder='请输入新密码' />
                </Form.Item>
            </Form>
        </Modal>
        <div className='flex items-center'>
            {app.collapsed ? <MenuUnfoldOutlined onClick={toggle} className='text-cool-[#fff]' /> :
                <MenuFoldOutlined onClick={toggle} className='text-cool-[#fff]' />}
            {/* 面包屑 */}
            <Breadcrumb className='ml-4'>
                <Breadcrumb.Item className='text-cool-[#fff]'>首页</Breadcrumb.Item>
                {
                    breadCrumb.map((item, index) => (
                        <Breadcrumb.Item key={index} className='text-cool-[#fff]'>{item.name}</Breadcrumb.Item>
                    ))
                }
            </Breadcrumb>
        </div>
        <div>
            <Dropdown overlay={
                <Menu items={[
                    {
                        key: 1,
                        label: <div onClick={() => setIsShowEditPass(true)}>修改密码</div>
                    },
                    {
                        key: 2,
                        label: <div onClick={() => {
                            Modal.confirm({
                                title: '您确定要退出登录？',
                                closable: true,
                                okText: '确定',
                                cancelText: '取消',
                                onOk: () => logout()
                            })
                        }}>退出登录</div>
                    }
                ]} />
            } placement='bottom'>
                <div className="flex items-center cursor-pointer">
                    <img className="w-[28px] h-[28px] rounded-full" src={user.userInfo.avatar} />
                    <span className="ml-3 text-cool-[#fff]">{user.userInfo.name}</span>
                </div>
            </Dropdown>
        </div>
    </Layout.Header>
}

export default Header