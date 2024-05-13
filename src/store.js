import { configureStore } from '@reduxjs/toolkit'
import authReducer from './redux/authSlice'
import userReducer from './redux/userSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer
  }
})
