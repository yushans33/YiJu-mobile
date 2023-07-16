import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { TabBar } from 'antd-mobile'
//导入图标
import { AppOutline, MessageOutline, MessageFill, UserOutline, } from 'antd-mobile-icons'

export default function Footer() {
    const [active, setActive] = useState('/')
    //跳转路由
    const navigate = useNavigate()
    //获取地址栏的信息
    const location = useLocation()
    //生命周期 执行一次
    // console.log(location)
    useEffect(() => {
        setActive(location.pathname)
    }, [])//eslint-disable-line
    //切换面板的回调
    function changeTab(key) {
        console.log(key);
        //修改active变量
        setActive(key)
        //跳转路由界面 路由动态
        navigate(key)
    }
    return (
        <div style={{ backgroundColor: '#fff', position: 'fixed', bottom: '0', left: '0', right: '0', borderTop: '1px solid #eee' }}>
            <TabBar activeKey={active} onChange={changeTab}>
                <TabBar.Item key={'/'} icon={<AppOutline />} title={'首页'} />
                <TabBar.Item key={'/shop'} icon={<MessageOutline />} title={'商城'} />
                <TabBar.Item key={'/life'} icon={<MessageFill />} title={'生活服务'} />
                <TabBar.Item key={'/about'} icon={<UserOutline />} title={'我的'} />
            </TabBar>
        </div>


    )
}



