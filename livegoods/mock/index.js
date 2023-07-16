//使用路由
//引入expre框架
const express = require('express')
//创建网站服务器
const app = express()
//导入路由对象
const router = require('./router')
//app.ues匹配所有请求方式，为路由对象匹配请求路径
app.use('/', router)

// //mockjs模拟数据
// const Mock = require('mockjs')
// //接口
// app.get('/', (req, res) => {
//     //生成数据
//     let data = Mock.mock({
//         msg: 'ok',
//         "list|10": [
//             {
//                 "id|+1": 1,
//                 info: "hello mock",
//                 "string|1-10": "*"
//             }
//         ]
//     });

//     res.send(data)

// })

//监听端口
app.listen(4000, () => {
    console.log(4000);
})