

import React from 'react'
import { Spin } from 'antd'

const Loading = () => {
    return <div className='w-screen h-screen flex justify-center items-center fixed'>
        <Spin />
    </div>
}

export default Loading