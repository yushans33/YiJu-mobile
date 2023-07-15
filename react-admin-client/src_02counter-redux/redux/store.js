import { createStore } from 'redux'
import reducer from './reducer'
/*
redux最核心的管理对象: store
 */
export default createStore(reducer)//创建store对象内部会第一次调用reducer()得到初始状态值