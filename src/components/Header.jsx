import React from 'react'
import { Avatar, Flex } from "antd"
import { UserOutlined } from '@ant-design/icons'

const CustomHeader = () => {
  return (
    <Flex align="center" justify="end">
        <Flex aligh="center" gap="10px">
            <Avatar icon={<UserOutlined/>}/>
        </Flex>
    </Flex>
  )
}

export default CustomHeader;