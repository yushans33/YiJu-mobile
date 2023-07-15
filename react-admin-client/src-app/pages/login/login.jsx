import React, { Component } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import './login.css'
import logo from '../../assets/images/logo.png'
import { reqLogin } from '../../api';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils'
/* 因为一般组件没有路由组件的api,this.history={}
解决办法：使用高阶组件withRouter是react-router5,所以在v6使用history跳转
<unstable_HistoryRouter>提供一个将history作为prop的实例对象 */
import { customHistory } from '../../utils/history';
import { Navigate } from 'react-router-dom';



// 登录组件
export default class Login extends Component {

    // 提交表单且数据验证成功后回调事件
    onFinish = async (values) => {
        // console.log('提交登录的ajax请求: ', values);
        // 请求登录
        const { username, password } = values


        // reqLogin(username, password).then(response => {
        //     console.log('成功了', response.data)
        // }).catch(error => {
        //     console.log('失败了', error)
        // })
        /* await优化后每次发送一个请求就要进行异常捕获，在ajax模块中统一处理请求出错 */
        // try {
        let result = await reqLogin(username, password)//{status:0 ,data:user} {status:1,msg}
        // console.log('请求成功了', response.data)
        //在ajax请求模块成功之间返回response.data
        // let result = response.data n
        if (result.status === 0) {
            message.success('登录成功')
            memoryUtils.user = result.data // 保存user在内存中
            storageUtils.saveUser(result.data)// 保存到本地中，持久化
            // console.log(memoryUtils.user.username)
            // this.props.history.replace('/')
            // window.location.replace('/')
            customHistory.replace('/')//跳转管理页面,不需要在跳转到登录

        } else {
            message.error(result.msg)
        }
        // } catch (error) {
        //     console.log('失败了', error)
        // }

    };
    // 对密码进行自定义验证
    validatePsw = (rule, value) => {
        if (!value) {
            return Promise.resolve(new Error('密码必须输入！'))
        } else if (value.length < 4) {
            return Promise.reject(new Error('密码至少4位！'))
        } else if (value.length > 12) {
            return Promise.reject(new Error('密码至多12位！'))
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            return Promise.reject(new Error('密码必须是字母数组下划线组成！'))
        } else {
            return Promise.resolve()
        }

    }
    render() {
        //如果用户硬件登入，自动跳转管理页面
        const user = memoryUtils.user
        if (user && user._id) {
            return <Navigate to='/' />
        }
        return (
            <div className="login">
                <header className='login-header'>
                    <img src={logo} alt="logo" />
                    <h1>React 项目: 后台管理系统</h1>
                </header>
                <section className='login-content'>
                    <h2>用户登陆</h2>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.onFinish}

                    >
                        <Form.Item name="username"// 配置对象: 属性名是特定的一些名称
                            // 声明式验证: 直接使用别人定义好的验证规则进行验证
                            rules={[
                                { required: true, whitespace: true, message: ' 请输入用户名！' },
                                { min: 4, message: ' 用户名最少4位' },
                                { max: 12, message: ' 用户名最多12位' },
                                // +任意多个字符
                                { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文数字下划线组成' },

                            ]}
                            initialValue={'admin'}//初始默认值
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" style={{ color: 'rgba(0,0,0,.25)' }} />
                        </Form.Item>
                        <Form.Item name="password"
                            rules={[
                                //自定义验证
                                { validator: this.validatePsw }
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="密码"
                                style={{ color: 'rgba(0,0,0,.25)' }}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登陆
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}


/*
1. 高阶函数
    1). 一类特别的函数
        a. 接受函数类型的参数
        b. 返回值是函数
    2). 常见
        a. 定时器: setTimeout()/setInterval()
        b. Promise: Promise(() => {}) then(value => {}, reason => {})
        c. 数组遍历相关的方法: forEach()/filter()/map()/reduce()/find()/findIndex()
        d. 函数对象的bind()
        e. Form.create()() / getFieldDecorator()()
    3). 高阶函数更新动态, 更加具有扩展性

2. 高阶组件
    1). 本质就是一个函数
    2). 接收一个组件(被包装组件), 返回一个新的组件(包装组件), 包装组件会向被包装组件传入特定属性
    3). 作用: 扩展组件的功能
    4). 高阶组件也是高阶函数: 接收一个组件函数, 返回是一个新的组件函数
 */

/*
1. 前台表单验证
2. 收集表单输入数据
*/

/*
async和await
1. 作用?
   简化promise对象的使用: 不用再使用then()来指定成功/失败的回调函数
   以同步编码(没有回调函数了)方式实现异步流程
2. 哪里写await?
    在返回promise的表达式左侧写await: 不想要promise, 想要promise异步执行的成功的value数据
3. 哪里写async?
    await所在函数(最近的)定义的左侧写async
 */
