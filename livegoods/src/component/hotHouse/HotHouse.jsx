import React from 'react'
import './style.css'
import { Grid } from 'antd-mobile'
import { PropTypes } from 'prop-types'
import { useNavigate } from 'react-router-dom'
export default function HotHouse(props) {
    const navigate = useNavigate()
    function tiao(id) {
        navigate('/detail/' + id)
        console.log(id)
    }
    return (
        <div>
            {
                props.list.map((ele, index) => {
                    return <div className='box' key={index} onClick={tiao.bind(null, ele.id)}>
                        <img src={ele.imgUrl} alt="" />
                        <div className='wrapper'>
                            <Grid columns={3}>
                                <Grid.Item span={2}>
                                    <div className='info'>
                                        <div>{ele.adress}</div>
                                        {
                                            ele.floor ? <span>楼层：{ele.floor}</span> : ''
                                        }
                                        <div className='message'>{ele.huxing}-<span>{ele.area}㎡</span></div>
                                    </div>

                                </Grid.Item>
                                <Grid.Item span={1}>
                                    <div className='type'>{ele.type}</div>
                                    <p className='price'>{ele.price}/月</p>
                                </Grid.Item>
                            </Grid>
                        </div>
                    </div>
                })
            }
        </div>

    )
}

// props数据类型
HotHouse.propTypes = {
    list: PropTypes.array.isRequired
}
