import React from 'react'
import * as Icons from '@ant-design/icons'
import { ChromeOutlined } from '@ant-design/icons'

interface IProps {
    style?: any;
    name: string;
}

const Icon = (props: IProps) => {
    const ICON = React.createElement(
        // @ts-ignore
        Icons[props.name],
        {
            style: { ...props.style }
        }
    )
    return ICON.type ? ICON : <ChromeOutlined />
}

export default Icon