// 入口文件
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import memoryUtils from './utils/memoryUtils'
// import storageUtils from './utils/storageUtils'
import { Provider } from 'react-redux'
import store from "./redux/store";
// 将App组件标签渲染的到index页面的div上

// 将local本地用户信息保存到内存中
// memoryUtils.user = storageUtils.getUser()
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'))