import React, { useEffect, useState } from 'react'
import './style.css'
import api from '../../api/index'
import AntSwiper from '../../component/antSwiper/AntSwiper'
import { NavLink, useNavigate } from 'react-router-dom'
import ShopList from './shopList/ShopList'
import { useSelector } from 'react-redux'


export default function Shop() {
    //轮播容器
    const [banner, setBanner] = useState([])
    //跳转Search页面
    const navigate = useNavigate()
    const city = useSelector(store => store.city.cityname)
    const [hot, setHot] = useState([])
    const [fa, setFa] = useState([])

    //生命周期网络请求
    useEffect(() => {
        //轮播接口
        api.getBanner().then(
            res => {
                console.log('轮播接口----', res.data.banner)
                setBanner(res.data.banner)
            }
        );
        getHotProduct();
        getFa();

    }, [])// eslint-disable-line

    function getSearch() {
        navigate('/search')
    }

    //请求热销单品的数据
    async function getHotProduct() {
        const res = await api.getHotProduct({ city: city })
        console.log('-----热销单品---', res.data)
        setHot(res.data.list)

    }
    //请求家庭常用的数据
    async function getFa() {
        const res = await api.getFamily({ city: city })
        console.log('-----家庭常用---', res.data)
        setFa(res.data.list)

    }

    return (
        <div>
            {/* 搜索框 */}
            <div className='header'>
                <div className='center' onClick={getSearch}>搜索</div>
                <div className='shopCar'>购物车</div>
            </div>
            {/* 轮播区域 */}
            <AntSwiper arr={banner} />

            {/* 新品上市 二手商城 */}
            <div className='content'>
                <NavLink style={{ color: '#fff' }} to='/classmate'>
                    <div className='item'>新品上市</div>
                </NavLink>
                <NavLink style={{ color: '#fff' }} to='/community'>
                    <div className='item'>二手商城</div>
                </NavLink>

            </div>
            {/* 热销单品 */}
            <ShopList list={hot} title='热销单品 ' />
            {/* 家庭常用 */}
            <ShopList list={fa} title='家庭常用' />
        </div>
    )
}
