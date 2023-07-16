import React, { useEffect, useState } from 'react'
import './style.css'
import { NavLink, useNavigate } from 'react-router-dom'
// import Search from '../../component/search/Search'
import api from '../../api/index'
import AntSwiper from '../../component/antSwiper/AntSwiper'
// import Swiper from '../../component/swiper/Swiper'
import HotHouse from '../../component/hotHouse/HotHouse'



export default function Home() {
    //轮播容器
    const [banner, setBanner] = useState([])
    //热门房源
    const [list, setList] = useState([])
    //跳转Search页面
    const navigate = useNavigate()

    //生命周期网络请求
    useEffect(() => {
        //轮播接口
        api.getBanner().then(
            res => {
                console.log('轮播接口----', res.data.banner)
                setBanner(res.data.banner)
            }
        );
        //热门房源接口
        api.getHotHouse().then(
            res => {
                console.log('热门房源接口----', res.data.list)
                setList(res.data.list)

            }
        )
    }, [])

    function getSearch() {
        navigate('/search')
    }

    return (
        <div>
            {/* 搜索框 */}
            <div className='header'>
                <div className='location'>
                    <NavLink to='/city'>
                        上海<span className='iconfont icon-xiala'></span>
                    </NavLink>
                </div>
                <div className='center' onClick={getSearch}>
                    {/* <Search /> */}
                </div>
                <div className='shopCar'>购物车</div>
            </div>
            {/* 轮播区域 */}
            <AntSwiper arr={banner} />
            {/* <Swiper arr={banner} /> */}

            {/* 舍友 社区 */}
            <div className='content'>
                <NavLink style={{ color: '#fff' }} to='/classmate'>
                    <div className='item'>找舍友</div>
                </NavLink>
                <NavLink style={{ color: '#fff' }} to='/community'>
                    <div className='item'>宜居社区</div>
                </NavLink>

            </div>

            {/* 热门房源 */}
            <div className='list'>
                <h3>热门房源</h3>
                <HotHouse list={list} />
            </div>

        </div>
    )
}
