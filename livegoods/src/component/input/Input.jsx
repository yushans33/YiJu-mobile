import React, { useState, useEffect } from 'react'
import './style.css'



export default function Input(props) {
    const [value, setValue] = useState('')

    //定义ref跳转页面之后input自动聚焦
    const inputRef = React.createRef()
    useEffect(() => {
        inputRef.current.focus()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    //获取输入值
    function changeInput(e) {
        console.log(e)
        setValue(e.target.value)
    }
    // 键盘事件
    function getKeyCode(e) {
        // //触发回车功能 把子组件的value传递给父组件
        if (e.keyCode === 13) {
            props.getInputVal(value)

        }
    }
    return (
        //自定义表单 value={} onchange结合使用
        <div>
            <input type="text" ref={inputRef} value={value} onKeyUp={getKeyCode} onChange={changeInput} className='input' />
        </div>
    )
}
