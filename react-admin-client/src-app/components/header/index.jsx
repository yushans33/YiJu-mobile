import React, { Component } from 'react'
import { formateDate } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils'
import { reqWeather } from '../../api';
// import { type } from '../../utils/weatherUtils'
import items from '../../config/menuConfig'
import { Modal } from 'antd';
import { customHistory } from '../../utils/history';
// import LinkButton from '../link-button/index'
import './index.css'

export default class Header extends Component {
    state = {
        currentTime: formateDate(Date.now()),//当前事件字符串
        //dayPictureUrl: '', // 天气图片url，接口禁用暂时写成静态
        weather: '', // 天气的文本
    }
    getTime = () => {
        // 每隔1s获取当前时间, 并更新状态数据currentTime
        this.intervalId = setInterval(() => {
            const currentTime = formateDate(Date.now())
            this.setState({ currentTime })
        }, 1000)
    }

    getWeather = async () => {
        // 调用接口请求异步获取数据
        const { weather } = await reqWeather()
        // 更新状态
        this.setState({ weather })
    }


    getTitle = () => {
        // 得到当前请求路径
        let path = window.location.pathname
        path = path === '/' ? '/home' : path //如果路径是'/'则默认为'/home'
        let title
        items.forEach(item => {
            if (item.key === path) { // 如果当前item对象的key与path一样,item的title就是需要显示的title
                // console.log(item.label.props.children)
                title = item.label.props.children
            } else if (item.children) {
                // 在所有子item中查找匹配的
                const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)//匹配到当前路由或者子路由
                // 如果有值才说明有匹配的
                if (cItem) {
                    // 取出它的title
                    title = cItem.label.props.children
                }
            }
        })
        return title
    }


    /* 退出登录 */
    logout = () => {
        Modal.confirm({
            // icon: <ExclamationCircleFilled />,
            content: '确定退出嘛',
            onOk: () => {
                console.log('OK');
                //删除内存和本地中保存的user数据
                storageUtils.removeUser()
                memoryUtils.user = {}
                //跳转到登录页面
                customHistory.replace('/login')

            },

        });

    }

    /*
    第一次render()之后执行一次
    一般在此执行异步操作: 发ajax请求/启动定时器
     */
    componentDidMount() {
        // 获取当前天气
        this.getTime()
        // 获取当前天气
        this.getWeather()
    }

    /*
  // 不能这么做: 不会更新显示,只执行一次
  componentWillMount () {
    this.title = this.getTitle()
  }*/

    /*
    当前组件卸载之前调用
     */
    componentWillUnmount() {
        // 清除定时器
        clearInterval(this.intervalId)
    }

    render() {
        const { currentTime, weather } = this.state
        const username = memoryUtils.user.username
        const title = this.getTitle()
        return (
            <div className='header'>
                <div className='header-top'>
                    <span>欢迎 {username}</span>
                    <span onClick={this.logout} style={{ color: '#1DA57A' }}>退出</span>
                    {/* <LinkButton onClick={this.logout} style={{ color: '#1DA57A' }}>退出</LinkButton> */}
                </div>
                <div className='header-buttom'>
                    <div className='header-buttom-left'>{title}</div>
                    <div className='header-buttom-right'>
                        <span>{currentTime}</span>
                        {/* 天气图片接口禁用，先写成静态的，dayPictureUrl */}
                        <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt="" />
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}
