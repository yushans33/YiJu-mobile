import { createSlice } from '@reduxjs/toolkit'
//如果做持久化，则获取本地存储的信息赋值下面的参数--如果已经登入则刷新页面也不用登入
// let user = localStorage.getItem('user')
const userSlice = createSlice({
    name: 'user',//名称 任意写 必写属性
    initialState: {//user的初始状态
        username: '默认名字',
        token: ' ',
        isLogin: true

    },
    reducers: {//操作actions的动作 -- 操作数据initialState
        setUser: (state, action) => {
            state = action.payload
            return state
        },
        deleteuser: state => {
            state.username = ''
            state.token = ''
            state.isLogin = true

        }
    }
})
// console.log('store----citySlice-----',citySlice);

// // 每个 case reducer 函数会生成对应的 Action creators
export const { setUser, deleteuser } = userSlice.actions

export default userSlice.reducer