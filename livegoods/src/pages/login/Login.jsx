import React, { useState } from 'react'
import './style.css'
//导入redux
import { useDispatch } from 'react-redux'
//路由
import { useNavigate } from 'react-router-dom'
//action-reducers
import { setUser } from '../../store/reducers/user'


export default function Login() {
    const [user, setUsername] = useState('')
    const [psw, setPsw] = useState('')
    //redux-dispatch
    const dispatch = useDispatch()
    const navigate = useNavigate()
    function denglu() {
        console.log(user, psw)
        if (user === '' || psw === '') {
            alert('账号密码不能为空')
        }

        //假设登录信息--并且账号密码正确---假设请求过了请求----------------
        //1. 存储登录状态信息 2. 数据持久化  3. 跳转网页
        let obj = {
            username: user,
            token: 'Xtsyguduhi27yh ',
            isLogin: true
        }
        dispatch(setUser(obj))//没有做持久化，如果做就在user.j获取本地存储信息赋值给下面的内容，这样就看不到登录页面了
        localStorage.setItem('user', JSON.stringify(obj))
        navigate(-1)

    }

    return (
        <>
            <div className='topBox'>宜居</div>
            <div className='login'>
                <div className='inputs'>
                    <input type="text" placeholder='请输入账号' value={user} onChange={e => setUsername(e.target.value)} />
                    <br />
                    <input type="text" placeholder='请输入密码' value={psw} onChange={e => setPsw(e.target.value)} />

                </div>
                <div className='but' onClick={denglu}>登录</div>

            </div>
        </>

    )
}
