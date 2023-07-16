import React from 'react'
import { Swiper } from 'antd-mobile'
import { PropTypes } from 'prop-types'
import { useNavigate } from 'react-router-dom'


export default function AntSwiper(props) {
    // console.log('props.arr---', props.arr) //开始获取是空数组，首次渲染的时候当接口获得数据后，数据有了
    const navigate = useNavigate()
    function tiao(id) {
        console.log('------------tiao---------')
        navigate('/detail/' + id)
    }
    return (
        <div>
            <Swiper autoplay loop autoplayInterval={1000}
            // indicator={(total, current) => (
            //     //total总的swiper数量, current当前swiper的下标，从0开始
            //     <div indicator={(total, current) => (
            //         <div style={{ position: 'absolute', bottom: '10px', right: '10px', color: '#fff' }}>
            //             {`${current + 1} / ${total}`}
            //         </div>
            //     )} >
            //         {`${current + 1} / ${total}`}
            //     </div>
            // )}
            >
                {
                    props.arr.length > 0 ? props.arr.map((ele, index) => {
                        return <Swiper.Item key={index}>
                            {
                                ele.id ? <img src={ele.imgUrl} width="100%" alt="" onClick={tiao.bind(null, ele.id)} />
                                    : <img src={ele.imgUrl} width="100%" alt="" />
                            }

                        </Swiper.Item>
                    }) : <Swiper.Item></Swiper.Item>
                }
            </Swiper>
        </div>
    )
}

// props数据类型
AntSwiper.propTypes = {
    arr: PropTypes.array.isRequired
}



