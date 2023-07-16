import { configureStore } from '@reduxjs/toolkit'
import citySlice from './reducers/citys'
import user from './reducers/user'
const store = configureStore({
  reducer: {
    city: citySlice,
    user
  }
})

export default store