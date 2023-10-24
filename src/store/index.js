import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./slice/userSlice"
import maintenanceStatusAndCountReducer from './slice/MaintenanceSlice/maintenanceStatusAndCount'
export const store = configureStore({
  reducer: {
    user:userReducer,
    maintenanceStatusAndCount: maintenanceStatusAndCountReducer
  },
})