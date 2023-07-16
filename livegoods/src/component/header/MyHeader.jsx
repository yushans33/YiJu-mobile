import React from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom'
export default function MyHeader(props) {
    const navigate = useNavigate()
    //返回上一层路径
    function goback() {
        navigate(-1)
    }
    return (
        <div className='topHeader'>
            <span className='iconfont icon-fanhui' onClick={goback}></span>

            {/* <div className='title'>{props.title}</div> */}
            <div className='title'>
                {props.children}
            </div>
        </div>
    )
}
MyHeader.defaultProps = { title: '' }


