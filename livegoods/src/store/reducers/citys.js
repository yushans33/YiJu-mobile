import { createSlice } from '@reduxjs/toolkit'
//获取本地城市名称
console.log('获取本地城市名称',localStorage.getItem('cityname'));
let cityname = localStorage.getItem('cityname') ||'上海'
// console.log('--------cityname----------',cityname);

const citySlice = createSlice({
  name: 'citys',
  initialState: {
    cityname
  },
  reducers: {
    change:(state,action)=>{
        state.cityname = action.payload
    },
    deletecity:state=>{
        state.cityname =''
    }
  }
})
// console.log('store----citySlice-----',citySlice);

// // 每个 case reducer 函数会生成对应的 Action creators
export const { change, deletecity} = citySlice.actions

export default citySlice.reducer