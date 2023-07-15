/*
包含n个用来创建action的工厂函数(action creator)
 */
import { INCERMENT, DECERMENT } from './action-types'
/*
增加的action
 */
export const increment = (number) => ({ type: INCERMENT, data: number })

/*
减的action
 */
export const decrement = (number) => ({ type: DECERMENT, data: number })