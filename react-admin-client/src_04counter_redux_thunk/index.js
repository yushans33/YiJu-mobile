// 入口文件
import React from "react";
import ReactDOM from "react-dom";
import App from "./container/App";
import store from "./redux/store";
import { Provider } from 'react-redux'

// 将App组件标签渲染的到index页面的div上
ReactDOM.render(
    <Provider store={store} >
        <App />
    </Provider>
    , document.getElementById('root'))


