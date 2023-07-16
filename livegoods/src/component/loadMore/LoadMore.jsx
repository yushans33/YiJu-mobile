import React, { useEffect } from 'react'

export default function LoadMore(props) {
    let flag = true
    //生命周期
    useEffect(() => {
        //绑定给window添加事件
        window.addEventListener('scroll', scrollFun)
        //清空操作，解除绑定---不然page一变化重复渲染视图，之前的事件一直在
        return () => { window.removeEventListener('scroll', scrollFun) }
    }, [props.page])  // eslint-disable-line

    //下拉加载更多的数据
    function scrollFun() {
        console.log('-----------下拉加载更多的数据---------------')
        //滚动的高度
        const height = document.documentElement.scrollTop
        //窗口的高度
        const winHeight = document.documentElement.clientHeight
        //文档的高度】
        const domHeight = document.body.clientHeight
        if (height + winHeight + 50 >= domHeight && flag) {
            flag = false
            // setPage(page + 1)//响应式修改，视图同步更新  会不停的渲染
            props.val ? props.getMsg(props.val, props.page) :
                props.getMsg(props.page)
        }
    }
    return (
        <div></div>
    )
}
