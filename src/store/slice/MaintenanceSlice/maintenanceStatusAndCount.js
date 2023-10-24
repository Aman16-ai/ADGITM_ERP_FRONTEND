import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { getMaintenanceStatusAndCount } from "../../../services/Maintenance";

export const maintenanceStatusAndCountThunk = createAsyncThunk('maintenanceStatusAndCount/maintenanceStatusAndCount',async(thunkApi) => {
    try {
        console.log('running thunk')
        const result = await getMaintenanceStatusAndCount()
        console.log('thunk result ---->',result)
        return result
    }
    catch(err) {
        return thunkApi.rejectWithValue
    }
})
export const maintenanceStatusAndCountSlice = createSlice({
    name:"maintenanceStatusAndCount",
    initialState : {
        data : [],
        isLoading : false
    },
    reducers : {
        updateCount : (state,action) => {
            state.data = {...state.data,[action.name]:state.data.name + action.value}
        }
    },
    extraReducers : {
        [maintenanceStatusAndCountThunk.fulfilled] : (state,action) => {
            state.data = action.payload
            state.isLoading = false
        },
        [maintenanceStatusAndCountThunk.rejected] : (state,action) => {
            state.data = []
        }
    }
})

export const {updateCount} = maintenanceStatusAndCountSlice.actions
export const selectMaintenanceStatusAndCountData = (state) => state.maintenanceStatusAndCount.data
// export const selectIsAuthenticated = (state) => state.user.isAuthenticated
export default maintenanceStatusAndCountSlice.reducer