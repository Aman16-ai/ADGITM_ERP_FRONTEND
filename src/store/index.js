import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./slice/userSlice"
import maintenanceStatusAndCountReducer from './slice/MaintenanceSlice/maintenanceStatusAndCount'
import maintenanceReducer from "./slice/MaintenanceSlice/maintenanceSlice"
export const store = configureStore({
  reducer: {
    user:userReducer,
    maintenanceStatusAndCount: maintenanceStatusAndCountReducer,
    maintenance : maintenanceReducer
  },
})