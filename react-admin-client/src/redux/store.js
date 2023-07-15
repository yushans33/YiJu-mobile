import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'
import { composeWithDevTools } from 'redux-devtools-extension'//只是调试工具
/*
redux最核心的管理对象: store
 */

// 向外默认暴露store
export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))