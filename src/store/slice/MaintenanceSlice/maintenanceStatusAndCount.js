import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { getMaintenanceStatusAndCount } from "../../../services/Maintenance";
import { updateMaintenaceIssueThunk } from "./maintenanceSlice";

export const maintenanceStatusAndCountThunk = createAsyncThunk('maintenanceStatusAndCount/maintenanceStatusAndCount',async(query,thunkApi) => {
    try {
        console.log('running thunk')
        console.log('query ------> ',query)
        const result = await getMaintenanceStatusAndCount(query)
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
            let totalCount = 0
            action.payload?.forEach(d => {
                totalCount += d.count
            });
            state.data = [{'status':'Total','count':totalCount},...state.data]
            // const total = state.data.find(r => r?.status === 'Total')
            // const progress = state.data.find(r => r?.status === 'Progress')
            // const completed = state.data.find(r => r?.status === 'Completed')
            // const pending = state.data.find(r => r?.status === 'Pending')
            // const rejected = state.data.find(r => r?.status === 'Rejected')
            // state.data =[total,pending,progress,completed,rejected]
            // for(d of result) {
            //     console.log(d)
            // }
            console.log('count state eR -------->')
            state.isLoading = false
        },
        [maintenanceStatusAndCountThunk.rejected] : (state,action) => {
            state.data = []
        },
        [updateMaintenaceIssueThunk.fulfilled] : (state,action) => {
            console.log('from status and count reducer',action.payload)
            const originalStatus = action.payload.originalStatus
            const updatedStatus = action.payload.result.status
            const result = state.data.map((d) => {
                if(d.status === originalStatus) {
                    return {...d,count:d.count-1}
                }
                else if(d.status === updatedStatus) {
                    return {...d,count:d.count+1}
                }
                else {
                    return {...d}
                }
            })
            console.log('after update status and count result',result)
            // const total = result.find(r => r.status === 'Total')
            // const progress = result.find(r => r.status === 'Progress')
            // const completed = result.find(r => r.status === 'Completed')
            // const pending = result.find(r => r.status === 'Pending')
            // const approvalPending = result.find(r => r.status === 'Approval Pending')
            // const verified = result.find(r => r.status === 'Verified')
            // state.data =[total,progress,pending,completed,verified,approvalPending]
            state.data = [...result]
        }
    }
})

export const {updateCount} = maintenanceStatusAndCountSlice.actions
export const selectMaintenanceStatusAndCountData = (state) => state.maintenanceStatusAndCount.data
// export const selectIsAuthenticated = (state) => state.user.isAuthenticated
export default maintenanceStatusAndCountSlice.reducer