import React, { useState, useEffect } from 'react'
import MyHeader from '../../component/header/MyHeader'
import { useSelector } from 'react-redux'
import './style.css'
import api from '../../api/index'
import LoadMore from '../../component/loadMore/LoadMore'
import { Rate } from 'antd-mobile'
export default function Comment() {
    //redux仓库里获取用户和城市
    const userName = useSelector(state => state.user.username)
    const cityName = useSelector(state => state.city.cityname)
    const [list, setList] = useState([])
    //开关
    let flag = true // eslint-disable-line
    const [page, setPage] = useState(0)
    //评论输入框的内容 星星
    const [val, setVal] = useState('')
    const [star, setStar] = useState(0)
    //定义一个标识，用于显示评论框 没有id是等于-1的默认都隐藏 当current===id显示
    const [current, setCurrent] = useState(-1)
    //提交取消---获取用户的id value star数据存到后台 请求后台节课 改变iscommentde值评论---已评论   隐藏
    function getSubmit(id, index) {
        console.log(id, val, star)
        if (val === '' || star === 0) {
            alert('请评论后再提交')
            return
        }
        //修改iscomment变量
        list[index].iscommit = true
        //同步更新----如果直接存list只改变了里面的元素，react认为list没有改变。所以用扩展运算法认为是创建了一个新的对象数组
        setList([...list])
        //隐藏评论
        setCurrent(-1)
        //清空val
        setVal('')

    }
    function getClose() {
        //隐藏评论
        setCurrent(-1)
        //清空val
        setVal('')

    }
    useEffect(() => {
        getComment(page)
    }, [])// eslint-disable-line
    //获取评论信息
    async function getComment(page) {
        let res = await api.getShopComment({ city: cityName, user: userName })
        setList([...list, ...res.data.list])
        console.log(res.data)
        flag = true
        setPage(page + 1)

    }

    return (
        <div>
            <MyHeader>房源信息</MyHeader>
            <p>用户名：{userName}</p>
            <p>所在城市：{cityName}</p>
            {/* 评论列表展示 */}
            <ul className='list'>
                {
                    list.map((ele, index) => {
                        return <li key={index}>
                            <div className='shoplist-item'>
                                <img className='shop-img' src={ele.img} alt="" />
                                <div className='shoplist-info'>
                                    <p>标题：{ele.title}</p>
                                    <p>户型：{ele.huxing}</p>
                                    <p>价格：{ele.huxing}</p>
                                </div>
                                {/* 评论 */}
                                <div className='ping'>
                                    {
                                        ele.iscommit ? <div className='gray' >已评论</div> : <div className='red' onClick={() => setCurrent(ele.id)}>评论</div>
                                    }
                                </div>
                            </div>
                            {/* 评论信息 怎么显示  点击的id===id标识就显示 */}
                            {
                                current === ele.id ? <div className='comment'>
                                    <textarea name="" id="" cols="50" rows="5" placeholder='请输入内容' value={val} onChange={e => setVal(e.target.value)}></textarea>
                                    <div>星星： <Rate onChange={val => { setStar(val) }} /></div>
                                    <button onClick={getSubmit.bind(null, ele.id, index)}>提交</button>
                                    <button onClick={getClose}>取消</button>
                                </div> : ''
                            }

                        </li>
                    })
                }
            </ul>
            {/* 加载更多的页面 */}
            <LoadMore getMsg={getComment} page={page} />
        </div>
    )
}
