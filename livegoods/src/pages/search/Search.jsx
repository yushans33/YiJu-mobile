import React, { useState } from 'react'
import MyHeader from '../../component/header/MyHeader'
import Input from '../../component/input/Input'
import './style.css'
import { useSelector } from 'react-redux'
import api from '../../api/index'
import HotHouse from '../../component/hotHouse/HotHouse'
import LoadMore from '../../component/loadMore/LoadMore'
export default function Search() {
    //获取store仓库里面的城市数据
    const cityName = useSelector(store => store.city.cityName)
    let [list, setList] = useState([])
    const [msg, setMsg] = useState('')
    const [val, setVal] = useState()
    let [page, setPage] = useState(0)
    let flag = true // eslint-disable-line
    //定义函数接受子组件传递的参数
    function getInputVal(val) {
        console.log(val)
        if (val.trim() === '') {
            setList([])
            setMsg('查无数据')
            return
        }
        //渲染时把之前的page list 清空----不清空不影响视图
        page = 0
        list = []
        setPage(0)
        setList([])
        //存储val的值---下拉加载更多数据
        setVal(val)
        //请求接口
        http(val)
    }
    //生命周期
    // useEffect(() => {
    //     //绑定给window添加事件
    //     window.addEventListener('scroll', scrollFun)
    //     //清空操作，解除绑定---不然page一变化重复渲染视图，之前的事件一直在
    //     return () => { window.removeEventListener('scroll', scrollFun) }
    // }, [page])  // eslint-disable-line

    // //下拉加载更多的数据
    // function scrollFun() {
    //     console.log('-----------下拉加载更多的数据---------------')
    //     //滚动的高度
    //     const height = document.documentElement.scrollTop
    //     //窗口的高度
    //     const winHeight = document.documentElement.clientHeight
    //     //文档的高度】
    //     const domHeight = document.body.clientHeight
    //     if (height + winHeight + 50 >= domHeight && flag) {
    //         flag = false
    //         // setPage(page + 1)//响应式修改，视图同步更新  会不停的渲染
    //         http(val, page)
    //     }
    // }
    //封装请求函数
    async function http(val, page = 0) {
        console.log('-----------http---------------')
        //查询数据
        let res = await api.getSearch({
            city: cityName,
            val,
            page,
        })
        //追加数据
        //拼接数据拿默认容器老数据 新请求数据
        if (page === 0) {
            console.log('----page---', page, list)//上一次的list结果-------如果重新输val值视图不影响
            setList(res.data.list)//因为page为0重新赋值10个，但是上一次list是之前窗口滑动的数据，不影响可以在渲染时listhe page重新设置
            console.log('----page---', page, res.data.list)

        } else {
            console.log([...list, ...res.data.list])
            setList([...list, ...res.data.list])

            //开关打开
            flag = true
        }
        // console.log(res.data)
        // setList(res.data.list)
        //修改page
        setPage(page + 1)//响应式修改，视图同步更新
        setMsg('')

    }
    return (
        <div>
            {/* 公共底部区域 */}
            <MyHeader>
                <div className='searchCity' >
                    <Input getInputVal={getInputVal} />
                </div>
            </MyHeader >
            {/* 底部展示区域 */}
            <div>
                <HotHouse list={list} />
                <LoadMore page={page} val={val} getMsg={http} />
            </div>
            <div>{msg}</div>


        </div>
    )
}
