import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
//直接引入了css+移动适配+iconfont
import './assets/css/base.css'
// 通过打开我的iconfont项目，浏览器打开查看相应的css 复制到本地
// import './assets/css/iconfont.css' 

//路由包裹容器
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'


// ReactDOM.render(<App />, document.getElementById('root'))
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>

  </BrowserRouter>

);

