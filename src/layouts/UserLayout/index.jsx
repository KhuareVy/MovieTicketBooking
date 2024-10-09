import React from 'react'
import { Layout, Flex } from 'antd'
import Navbar from '../../components/Navbar' 
import Footer from '../../components/Footer'
import Slider from '../../components/Slider'
import MovieMenu from '../../components/MovieMenu'
const { Content } = Layout;

const UserLayout = () => {
  return (
    <Flex gap="middle" style={{minHeight:'100vh'}} wrap>   
        <Layout>
            <Navbar />
            <Content>
                <Slider />
                <MovieMenu />
            </Content>
            <Footer />
        </Layout>
    </Flex>
  )
}

export default UserLayout