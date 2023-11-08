import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./slice/userSlice"
import maintenanceStatusAndCountReducer from './slice/MaintenanceSlice/maintenanceStatusAndCount'
import maintenanceReducer from "./slice/MaintenanceSlice/maintenanceSlice"
import maintenanceBarChartReducer from './slice/MaintenanceSlice/maintenanceBarChart'
export const store = configureStore({
  reducer: {
    user:userReducer,
    maintenanceStatusAndCount: maintenanceStatusAndCountReducer,
    maintenanceBarChart : maintenanceBarChartReducer,
    maintenance : maintenanceReducer,
  },
})