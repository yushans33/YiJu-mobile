import React, { useState, useEffect } from 'react'
import MyHeader from '../../component/header/MyHeader'
import api from '../../api/index'
import './style.css'
import { IndexBar, List } from 'antd-mobile'
//导入仓库
//导入仓库redux 
import { useDispatch, useSelector } from 'react-redux'
import { change } from '../../store/reducers/citys'
import { useNavigate } from 'react-router-dom'


//antd的静态模拟数据
// const getRandomList = (min, max) => {
//     return new Array(Math.floor(Math.random() * (max - min) + min)).fill('')
// }

// const charCodeOfA = 'A'.charCodeAt(0)
// const groups = Array(26)
//     .fill('')
//     .map((_, i) => ({
//         title: String.fromCharCode(charCodeOfA + i),
//         items: [1, 1, 1].map(() => '1111'),
//     }))
// console.log('groups-----', groups)



export default function City() {
    //定义变量存储城市信息
    const [current, setCurrent] = useState([])
    const [hotCity, setHotCity] = useState([])
    const [cityList, setCityList] = useState([])
    const [distance, setDistance] = useState(0)
    const divRef = React.createRef();
    const hotRef = React.createRef();
    //跳转界面
    const navigate = useNavigate();
    //react-redux 
    const dispatch = useDispatch()
    const cityname = useSelector(state => state.city.cityname)
    //-点击热门城市----------------------------------------------------------------
    //功能：1.获取当前点击的城市名称 2. 切换界面跳转路由返回首页 
    //3. 存储城市名称 共享 多个组件使用（redux + 本地存储-持久化）
    function changeCity(val) {
        console.log(val);
        //存储城市名称 -redux 
        dispatch(change(val))
        //本地
        localStorage.setItem('cityname', val)
        //返回首页
        navigate('/')

    }
    // 获取城市列表-------------------------------------
    async function getCityList() {
        let res = await api.getCitys();
        console.log('城市选择', res.data.list)
        const indexCitys = res.data.list.indexCitys
        console.log('热门城市---', indexCitys)

        //获取热门城市
        setHotCity(indexCitys.hot)
        //获取当前城市
        setCurrent(indexCitys.pos[0].name)
        //获取城市列表
        let groups = []
        for (let key in indexCitys) {
            if (key === 'pos' || key === 'hot') {
                continue
            }
            let obj = {}
            obj.title = key;
            obj.items = indexCitys[key]
            groups.push(obj)
        }
        console.log('grops---', groups)
        //存储数据
        setCityList(groups)
    }

    //生命周期函数
    useEffect(() => {
        getCityList();
        console.log(divRef.current.offsetTop, hotRef.current.clientHeight, window.innerHeight);
        //距离顶部的距离
        let height = window.innerHeight - hotRef.current.clientHeight;
        setDistance(height)
    }, [])// eslint-disable-line


    return (
        <div style={{ height: window.innerHeight, position: 'relative', overflow: 'hidden' }}>
            <div ref={hotRef}>
                {/* <MyHeader title='城市选择' /> */}
                <MyHeader>城市选择</MyHeader>
                <div className='showCity' >
                    {/* 当前城市 */}
                    <div className='current'>当前定位</div>
                    <div className='cityName'>{cityname}</div>

                    {/* 热门城市 */}
                    <div className='current'>热门城市</div>
                    <div className='cityContent'>
                        {
                            hotCity.map((ele) => {
                                return <div key={ele.id} className='cityName' onClick={changeCity.bind(null, ele.name)}> {ele.name}</div>
                            })
                        }
                    </div>
                </div>
            </div>


            {/* 城市列表 */}
            <div className='antCity' ref={divRef} style={{ height: distance, zIndex: 99 }}>
                <IndexBar>

                    {cityList.map(group => {
                        const { title, items } = group
                        return (
                            <IndexBar.Panel
                                index={title}
                                title={`${title}`}
                                key={`标题${title}`}
                            >
                                <List>
                                    {items.map((item, index) => (
                                        <List.Item key={index} onClick={changeCity.bind(null, item.name)} arrow={false}>{item.name}</List.Item>
                                    ))}
                                </List>
                            </IndexBar.Panel>
                        )
                    })}
                </IndexBar>
            </div>

        </div>


    )
}
