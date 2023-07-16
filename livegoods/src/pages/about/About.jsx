import React from 'react'
import style from './style.module.scss'
import classnames from 'classnames'
import { useNavigate } from 'react-router-dom'

export default function About() {
    const navigate = useNavigate()
    return (
        <div>
            {/* 顶部区域 */}
            <div className={style['me-header']}>
                <div className={style['user-img']}>
                    <i className='iconfont icon-yonghutouxiang'></i>
                </div>
                <i className='iconfont icon-shezhi' ></i>
            </div>
            {/* 导航分类 */}
            <ul className={style.list}>
                <li>
                    <i className='iconfont icon-shenghuo-'></i>
                    <p>优惠券</p>
                </li>
                <li>
                    <i className='iconfont icon-shoucang'></i>
                    <p>收藏</p>
                </li>
                <li>
                    <i className='iconfont icon-shouji'></i>
                    <p>约看</p>
                </li>
                <li>
                    <i className='iconfont icon-wode'></i>
                    <p>订单</p>
                </li>
                <li>
                    <i className='iconfont icon-xinxi'></i>
                    <p>私人助理</p>
                </li>
                <li>
                    <i className='iconfont icon-shangcheng'></i>
                    <p>微聊</p>
                </li>
                {/* 点击评论 需要先登录 登录后才可以看评论  点击评论 拦截 仓库isLogin */}
                <li onClick={() => { navigate('/comment') }}>
                    <i className='iconfont icon-xingxing'></i>
                    <p>评价</p>
                </li>
                <li>
                    <i className='iconfont icon-shangcheng'></i>
                    <p>投诉建议</p>
                </li>
            </ul>

            {/* 宜居管家 */}
            <div className={style.box}>
                <h3>宜居管家</h3>
                <ul className={classnames(style.list, style.wrapper)}>
                    <li>
                        <i className='iconfont icon-hetong'></i>
                        <p>我的合同</p>
                    </li>
                    <li>
                        <i className='iconfont icon-zulin'></i>
                        <p>转租</p>
                    </li>
                    <li>
                        <i className='iconfont icon-youhuiquan'></i>
                        <p>退租</p>
                    </li>
                    <li>
                        <i className='iconfont icon-dingdangdaizhimaxinyongshouquan'></i>
                        <p>芝麻信用</p>
                    </li>
                    <li>
                        <i className='iconfont icon-yanchituifang'></i>
                        <p>续租</p>
                    </li>
                    <li>
                        <i className='iconfont icon-zhangdan'></i>
                        <p>账单</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}
