import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { getAllMaintenanceIssues, updateMaintenaceIssue } from "../../../services/Maintenance";

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
export const updateMaintenaceIssueThunk = createAsyncThunk('maintenance/updateMaintenanceIssue',async({originalIssueId,originalStatus,body
},thunkApi) => {
    try {
        const result = await updateMaintenaceIssue(originalIssueId,body)
        return {result,originalIssueId,originalStatus}
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
        },
        [updateMaintenaceIssueThunk.fulfilled] : (state,action) => {
            console.log('after update issue reducer',action.payload)
            const originalStatus = action.payload.originalStatus
            const updatedStatus = action.payload.result.status
            
        }
    }
})

export const {updateCount} = maintenanceSlice.actions
export const selectAllMaintenanceIssue = (state) => state.maintenance.data
// export const selectIsAuthenticated = (state) => state.user.isAuthenticated
export default maintenanceSlice.reducer