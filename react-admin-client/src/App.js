// 应用的根组件
import React, { Component } from "react";
import { ConfigProvider } from 'antd';
// <unstable_HistoryRouter>提供一个将history作为prop的实例对象。
// 可以使用它在非React的上下文环境或全局变量中使用Router。
import { unstable_HistoryRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login/login";
import Admin from "./pages/admin/admin";
import { customHistory } from "./utils/history";



export default class App extends Component {
    handleClick = () => {
        alert("成功啦")
    }
    render() {
        return (

            // // /自定义antd主题颜色
            <ConfigProvider theme={{ token: { colorPrimary: '#1DA57A' } }}>
                {/* <BrowserRouter > */}
                <Router history={customHistory}>
                    {/* 只匹配其中一个 v6将Switch改为了Routes */}
                    <Routes >
                        <Route path="/login" element={<Login />} ></Route>
                        {/* 想要后面配二级路由一定要加'*'号否则路由匹配不到 */}
                        <Route path="/*" element={<Admin />}></Route>
                    </Routes>
                </Router>
                {/* </BrowserRouter> */}
            </ConfigProvider>

        )

    }
} 