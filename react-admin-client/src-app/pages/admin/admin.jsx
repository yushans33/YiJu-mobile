// 后台管理组件
import React, { Component } from 'react'
import memoryUtils from '../../utils/memoryUtils'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav';
import Header from '../../components/header';
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'

const { Footer, Sider, Content } = Layout;

export default class Admin extends Component {
    render() {
        const user = memoryUtils.user
        // console.log(user.username)
        // 如果内存没有存储user ==> 当前没有登陆
        if (!user || !user._id) {
            // 自动跳转到登陆(在render()中)
            return <Navigate to='/login' />
        }

        return (
            <Layout style={{ minHeight: "100%" }}>
                <Sider >
                    <LeftNav />
                </Sider>
                <Layout>
                    <Header >Header</Header>
                    <Content style={{ backgroundColor: "#fff", margin: 20 }}>
                        <Routes>
                            <Route path="/*" element={<Home />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/category" element={<Category />} />
                            <Route path="/product/*" element={<Product />} />
                            <Route path="/role" element={<Role />} />
                            <Route path="/user" element={<User />} />
                            <Route path="/charts/bar" element={<Bar />} />
                            <Route path="/charts/line" element={<Line />} />
                            <Route path="/charts/pie" element={<Pie />} />
                        </Routes>


                    </Content>
                    <Footer style={{ textAlign: "center", color: "#cccccc" }} >推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
                </Layout>
            </Layout>
        )
    }
}
