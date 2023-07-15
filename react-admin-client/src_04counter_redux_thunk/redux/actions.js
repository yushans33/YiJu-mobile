/*
包含n个用来创建action的工厂函数(action creator)
 */
import { INCERMENT, DECERMENT } from './action-types'

/*
增加的action
 */
export const increment = (number) => ({ type: INCERMENT, data: number })

/*
减的action同步：返回对象
 */
export const decrement = (number) => ({ type: DECERMENT, data: number })

/*
增加的action异步：返回函数
 */
export const incrementAsync = (number) => {
    return (dispatch) => {
        // 1. 执行异步(定时器, ajax请求, promise)
        setTimeout(() => {
            // 2. 当前异步任务执行完成时, 分发一个同步action
            dispatch(increment(number))
        }, 1000)
    }
}