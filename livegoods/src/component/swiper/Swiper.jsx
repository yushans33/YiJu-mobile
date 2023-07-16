import React from 'react'
//1.导入模块名称，来自swiper模块
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCube } from 'swiper';

//2.导入模块样式
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-cube';


export default function mySwiper(props) {
    return (
        <Swiper //加了loop自动会前后补一个圆点
            //3.moudle={[模块名称，..]}
            modules={[Navigation, Pagination, Autoplay, EffectCube]}
            //4.继续配置swiper标签上写时模块-- 小写
            //5.配置属性语法  pagination={[配置属性信息]}
            //6.如果swiper-react网站上没有这个模块直接把属性写在swiper上，比如loop 
            autoplay={{
                delay: 3000,
                stopOnLastSlide: false,//默认最后不停止
                disableOnInteraction: false,//手动翻页之后不让停止
            }}
            // navigation
            pagination={{
                clickable: true//分页小点可以点击
            }}
            loop
            //特效
            // effect={'cube'}
            // effctcube={{

            //     slideShadows: false,
            //     // shadow: true,
            //     // shadowOffset: 100,
            //     // shadowScale: 0.6
            // }}
            slidesPerView={1}
        // onSlideChange={() => console.log('slide change')}


        // onSwiper={(swiper) =>{//获取swiper的实例对象
        //     // console.log(swiper)
        //     swiper.slideTo(1)//使得第一次高亮在第一张，因为前后自动加了圆点没所以下标为1
        // } }
        >


            {
                props.arr.map((ele) => {
                    return <SwiperSlide key={ele.id}>
                        <img src={ele.imgUrl} width="100%" alt="" />
                    </SwiperSlide>
                })
            }

        </Swiper >
    )
}
