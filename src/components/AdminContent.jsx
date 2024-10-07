// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Flex } from 'antd'
import AdminRoutes from './AdminRoutes'

const AdminContent = () => {
  return (
    <div style={{ flex: 1}}>
        <Flex vertical gap="2.3rem">
            <AdminRoutes/>
        </Flex>
    </div>
  )
}

export default AdminContent