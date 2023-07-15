
/*
reducer函数模块: 根据当前state和指定action返回一个新的state
 */
import { INCERMENT, DECERMENT } from "./action-types"
//管理counter状态的reducer
export default function counter(state = 1, action) {
    const { type, data } = action
    console.log('reduxer', state, action)
    switch (type) {
        case INCERMENT:
            return state + data
        case DECERMENT:
            return state - data
        default:
            return state
    }


}