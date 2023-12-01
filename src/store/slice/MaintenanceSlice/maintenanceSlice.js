import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { getAllMaintenanceIssues, updateMaintenaceIssue } from "../../../services/Maintenance";
import { StarsTwoTone } from "@mui/icons-material";

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
        isLoading : false,
        filterKeys : {}
    },
    reducers : {
        updateCount : (state,action) => {
            state.data = {...state.data,[action.name]:state.data.name + action.value}
        },
        updateIssueStatus : (state,action) => {
            const id = action.payload.id
            const newStatus = action.payload.newStatus
            const result = state.data.map((d) => {
                if(d.id === id) {
                    return {...d,'status':newStatus}
                }
                return {...d}
            })
            console.log('result of update issue status',result)
            state.data = [...result]

        },
        applyFitler : (state,action) => {
            const filterName = action.payload.name
            const filterValue = action.payload.value
            state.filterKeys = {...state.filterKeys,[filterName]:filterValue}
            console.log('filter key ',state.filterKeys)
            if(filterValue === 'default' && filterName === 'department') {
                state.filterKeys = {'status':state.filterKeys['status']}
            }
            if(filterValue === 'default' && filterName === 'status') {
                state.filterKeys = {'department':state.filterKeys['department']}
            }
            console.log('default after filterkeys',state.filterKeys)
            if(Object.keys(state.filterKeys).length === 0) {
                console.log('running filter value ',filterValue,state.allData)
                state.data = [...state.allData]
            }
            else if('department' in state.filterKeys && 'status' in state.filterKeys) {
                console.log('running filter value ',filterValue,state.allData)
                const result = state.allData.filter((d) => (d.department.name.toLowerCase() === state.filterKeys.department.toLowerCase()) && (d.status.toLowerCase() === state.filterKeys.status.toLowerCase()))
                state.data = result
                console.log('filter result ',result)
            }
            else if('department' in state.filterKeys) {
                state.data = state.allData.filter(d => d.department.name.toLowerCase() === state.filterKeys.department.toLowerCase())
            }
            else if('status' in state.filter) {
                state.data = state.allData.filter((d) => d.status.toLowerCase() === state.filterKeys.toLowerCase())
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

export const {updateCount,applyFitler,updateIssueStatus} = maintenanceSlice.actions
export const selectAllMaintenanceIssue = (state) => state.maintenance.data
// export const selectIsAuthenticated = (state) => state.user.isAuthenticated
export default maintenanceSlice.reducer