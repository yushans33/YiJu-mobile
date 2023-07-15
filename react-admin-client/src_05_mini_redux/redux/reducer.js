
/*
reducer函数模块: 根据当前state和指定action返回一个新的state
 */
import { INCERMENT, DECERMENT } from "./action-types"
import { combineReducers } from '../lib/redux'
//管理counter状态的reducer
function count(state = 1, action) {
    const { type, data } = action
    console.log('count', state, action)
    switch (type) {
        case INCERMENT:
            return state + data
        case DECERMENT:
            return state - data
        default:
            return state
    }


}
function user(state = {}, action) {
    console.log('user()', state, action)
    switch (action.type) {

        default:
            return state
    }

}
export default combineReducers(
    {
        count,
        user
    }
)

