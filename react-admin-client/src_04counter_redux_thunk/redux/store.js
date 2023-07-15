import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'//只是调试工具
/*
redux最核心的管理对象: store
 */
export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))//创建store对象内部会第一次调用reducer()得到初始状态值