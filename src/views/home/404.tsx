import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Result, Button } from 'antd'

const Index = () => {
    const navigate = useNavigate()
    return <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary" onClick={() => {
            navigate('/')
        }}>回到首页</Button>}
    />
}

export default Index