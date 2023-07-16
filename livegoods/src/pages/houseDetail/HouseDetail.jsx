import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import MyHeader from '../../component/header/MyHeader'
import api from '../../api/index'
import AntSwiper from '../../component/antSwiper/AntSwiper'
import { Tabs, Rate } from 'antd-mobile'
import './style.css'
// import LoadMore from '../../component/loadMore/LoadMore'
import { useSelector } from 'react-redux'



export default function HouseDetail() {
    const [banner, setBanner] = useState([])
    const [info, setInfo] = useState('')
    const [list, setList] = useState([])//初始值切记类型不能搞错
    const param = useParams()
    let [page, setPage] = useState(0)
    let flag = true // eslint-disable-line no-unused-vars 
    console.log(param.id)
    //定义一个变量 标识收藏状态  未收藏 --显示：收藏 字段
    const [isCollect, setCollect] = useState(false);//是否收藏
    const navigate = useNavigate()
    //获取用户信息 ---登入的状态
    const isLogin = useSelector(state => state.user.isLogin)

    useEffect(() => {
        // localStorage.setItem('collects', '["100","102","103"]')----不然每次渲染都重置了
        getData()
        getCommentData()
        // 进入详情界面获取本地存储的id号 看当前的房源有没有被收藏---------------------------------
        let data = localStorage.getItem('collects');//[102,104]
        if (data) {//说明有收藏的房源
            //当前的房源有没有被收藏  params.id 
            //转成对象
            let arr = JSON.parse(data);
            console.log('-----------------------------', arr);
            if (arr.indexOf(param.id) >= 0) {//当前的房源有被收藏
                setCollect(true);//修改收藏状态显示
            }
        }

    }, [])// eslint-disable-line


    //房源信息请求
    async function getData() {
        let res = await api.getDetail({ id: param.id })
        console.log('房源详情信息-------', res.data)
        setBanner(res.data.banner)
        setInfo(res.data.info)

    }

    //评论信息请求
    async function getCommentData(page) {
        let res = await api.getComment({ id: param.id, page })
        console.log('-----------评论信息-----', res.data)
        //拼接评论信息
        setList([...list, ...res.data.list])
        //打开开关
        flag = true
        //修改page
        setPage(page + 1)

    }

    //手机号码1118****7777
    function phone(tel) {
        // let arr = tel.split('')
        // arr.splice(3, 4, '****')
        // return arr.join('')

        //字符串的截取
        let str = tel.slice(0, 4)
        str = str + '****'
        let after = tel.slice(8)
        str = str + after
        return str
    }


    // 下拉评论加载更多信息

    //生命周期
    useEffect(() => {
        //绑定给window添加事件
        window.addEventListener('scroll', scrollFun)
        //清空操作，解除绑定---不然page一变化重复渲染视图，之前的事件一直在
        return () => { window.removeEventListener('scroll', scrollFun) }
    }, [page])  // eslint-disable-line

    //下拉加载更多的数据
    function scrollFun() {
        console.log('-----------下拉加载更多的数据---------------')
        //滚动的高度
        const height = document.documentElement.scrollTop
        //窗口的高度
        const winHeight = document.documentElement.clientHeight
        //文档的高度】
        const domHeight = document.body.clientHeight
        if (height + winHeight + 50 >= domHeight && flag) {
            flag = false
            // setPage(page + 1)//响应式修改，视图同步更新  会不停的渲染
            getCommentData(page)
        }
    }

    //点击收藏按钮事件
    //2.未收藏--实现点击收藏功能 需要判断是否登录了 
    //登录了 进入收藏或者是取消收藏的功能
    //未登录 先登录界面登录才可以操作这个收藏功能
    function goCellect() {
        let arr = []
        let data = localStorage.getItem('collects')
        if (data) {//本地有储存收藏才可以转换数据类型
            arr = JSON.parse(data)
        }

        //1.需要判断是否登录了 
        if (isLogin) { //登入了,可以操作按钮
            //登录了 进入收藏或者是取消收藏的功能
            if (isCollect) {//已经收藏
                setCollect(false)//取消收藏
                //将本地仓库的id数据删除
                let index = arr.indexOf(param.id)
                arr.splice(index, 1)
                console.log('----------arr', arr)
            } else {//未收藏
                setCollect(true)//点击收藏
                arr.push(param.id)
                console.log('----------arr', arr)
            }

            //修改后的的数据存入仓库
            localStorage.setItem('collects', JSON.stringify(arr))

        } else {//没有登入
            navigate('/login')
        }
    }
    return (
        <div>
            {/* 公共顶部 */}
            <MyHeader>详情页</MyHeader>
            <p>房源详情页面参数{param.id}</p>
            {/* 轮播图 */}
            <AntSwiper arr={banner} />
            {/* 房源详情 */}
            <div >
                <Tabs>
                    <Tabs.Tab title=' 房源信息' key='fruits'>
                        <div className='faMsg'>
                            <div className='li'>
                                <p>{info.price}/月</p>
                                <p>租金</p>
                            </div>
                            <div className='li'>
                                <p>{info.huxing}</p>
                                <p>户型</p>
                            </div>
                            <div className='li'>
                                <p>{info.area}㎡</p>
                                <p>面积</p>
                            </div>
                        </div>
                        <div className='faDel'>
                            <p>标题：{info.title}</p>
                            <p>装修：{info.zhuangxiu}</p>
                            <p>楼层：{info.floor}</p>
                        </div>

                    </Tabs.Tab>
                    <Tabs.Tab title='评论信息' key='vegetables'>
                        {
                            list.map((ele, index) => {
                                return (
                                    <div key={index} className='commentMsg'>
                                        <p>电话：{phone(ele.tel)}</p>
                                        <div>星星：{ele.star}
                                            {/* 1.自己定义图标 */}
                                            {/* {
                                            [1, 2, 3, 4, 5].map((item) => {
                                                return <i key={item} className={item <= ele.star ? 'iconfont icon-shoucang active' : 'iconfont icon-shoucang'}></i>


                                            })
                                        } */}

                                            {/* 2.用ant库 */}
                                            <Rate readOnly value={ele.star} />
                                        </div>
                                        <p>评论内容：{ele.content}</p>
                                    </div>
                                )
                            })

                        }
                        {/* 加载更多信息 */}
                        {/* <LoadMore page={page} getMsg={getCommentData} /> */}
                    </Tabs.Tab>
                </Tabs>
            </div>

            {/* 底部收藏 购买 */}
            {/* 
            1. 显示状态：已收藏  收藏  -- 返回的值里面包好收藏的标识 渲染已收藏 
            2. 未收藏--实现点击收藏功能 需要判断是否登录了 
              登录了 进入收藏或者是取消收藏的功能
              未登录 先登录界面登录才可以操作这个收藏功能  
          
          */}
            <div className='bottom'>

                <div className='two' onClick={goCellect}>
                    {
                        isCollect ? '已收藏' : '收藏'
                    }

                </div>
                <div className='two'>购买</div>
            </div>



        </div>

    )
}
