import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { getAllMaintenanceIssues } from "../../../services/Maintenance";

export const getAllMaintenanceIssuesThunk = createAsyncThunk('maintenance/getAllMaintenanceIssues',async(thunkApi) => {
    try {
        console.log('running thunk')
        const result = await getAllMaintenanceIssues()
        console.log('thunk result ---->',result)
        return result
    }
    catch(err) {
        return thunkApi.rejectWithValue
    }
})
export const maintenanceSlice = createSlice({
    name:"maintenance",
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
        [getAllMaintenanceIssuesThunk.fulfilled] : (state,action) => {
            state.data = action.payload
            state.isLoading = false
        },
        [getAllMaintenanceIssuesThunk.rejected] : (state,action) => {
            state.data = []
        }
    }
})

export const {updateCount} = maintenanceSlice.actions
export const selectAllMaintenanceIssue = (state) => state.maintenance.data
// export const selectIsAuthenticated = (state) => state.user.isAuthenticated
export default maintenanceSlice.reducer