import { configureStore } from '@reduxjs/toolkit'
import LoggedInReducer from './features/Auth/LoggedIn'

export default configureStore({
  reducer: {
    LoggedIn: LoggedInReducer,
  },
})