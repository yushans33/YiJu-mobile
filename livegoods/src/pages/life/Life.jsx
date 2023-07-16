import React from 'react'
import api from '../../api/index'
import { useEffect } from 'react'

export default function Life() {
    useEffect(() => {
        //马蜂窝接口
        api.getMa()
            .then(res => {
                console.log('-------马蜂窝---', res.data);
            })
        //游天下
        api.getYou()
            .then(res => {
                console.log('-------游天下---', res.data);
            })


    }, [])

    return (
        <div>Life</div>
    )
}
