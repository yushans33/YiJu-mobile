import React from 'react'
import './style.css'

export default function ShopList(props) {
    return (
        <div className='cont'>
            <h3>{props.title}</h3>
            <ul className='contList'>
                {
                    props.list.map((ele) => {
                        return <li key={ele.id}>
                            <img src={ele.imgUrl} alt="" />
                            <p>{ele.title}</p>
                        </li>

                    })
                }
            </ul>
        </div>
    )
}
