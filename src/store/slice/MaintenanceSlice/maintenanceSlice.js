import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { getAllMaintenanceIssues, updateMaintenaceIssue } from "../../../services/Maintenance";

export const getAllMaintenanceIssuesThunk = createAsyncThunk('maintenance/getAllMaintenanceIssues',async(query,thunkApi) => {
    try {
        console.log('running thunk')
        const result = await getAllMaintenanceIssues(query)
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
        allData : [],
        data : [],
        isLoading : false
    },
    reducers : {
        updateCount : (state,action) => {
            state.data = {...state.data,[action.name]:state.data.name + action.value}
        },
        applyFitler : (state,action) => {
            const filterName = action.payload.name
            const filterValue = action.payload.value
            if(filterValue === 'default') {
                console.log('running filter value ',filterValue,state.allData)
                state.data = [...state.allData]
            }
            else if(filterName === 'department') {
                console.log('running filter value ',filterValue,state.allData)
                const result = state.allData.filter((d) => d.department.name.toLowerCase() === filterValue.toLowerCase())
                state.data = result
                console.log('filter result ',result)
            }
            else {
                state.data = state.allData.filter((d) => d.status.toLowerCase() === filterValue.toLowerCase())
            }

        }
    },
    extraReducers : {
        [getAllMaintenanceIssuesThunk.fulfilled] : (state,action) => {
            state.data = action.payload
            state.allData = action.payload
            state.isLoading = false
        },
        [getAllMaintenanceIssuesThunk.rejected] : (state,action) => {
            state.data = []
        },
        [updateMaintenaceIssueThunk.fulfilled] : (state,action) => {
            console.log('after update issue reducer',action.payload)
            // const originalStatus = action.payload.originalStatus
            // const updatedStatus = action.payload.result.status
            
        }
    }
})

export const {updateCount,applyFitler} = maintenanceSlice.actions
export const selectAllMaintenanceIssue = (state) => state.maintenance.data
// export const selectIsAuthenticated = (state) => state.user.isAuthenticated
export default maintenanceSlice.reducer