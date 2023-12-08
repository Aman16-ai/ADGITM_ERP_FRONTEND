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
        data : [
            {status:"Total",count:0},
            {status:"Pending",count:0},
            {status:"Progress",count:0},
            {status:"Completed",count:0},
            {status:"Verified",count:0},
            {status:"Approval Pending",count:0},
        ],
        isLoading : false
    },
    reducers : {
        updateCount : (state,action) => {
            state.data = {...state.data,[action.name]:state.data.name + action.value}
        }
    },
    extraReducers : {
        [maintenanceStatusAndCountThunk.fulfilled] : (state,action) => {
            
                // state.data = action.payload
                const updatedStatus = {
                    'Pending':0,
                    'Progress':0,
                    'Completed':0,
                    'Approval Pending':0
                }
                action.payload.forEach((d) => {
                    updatedStatus[d.status] = d.count
                })
                console.log('updatedStatus ------> ',updatedStatus)
                let totalCount = 0
                action.payload?.forEach(d => {
                    totalCount += d.count
                });
                let data = [...state.data]
                data = data.map((d) => {
                    if(d['status'] === 'Total') {
                        return {...d,'count':totalCount}
                    }
                    else if(d['status'] === 'Pending' && 'Pending' in updatedStatus) {
                        return {...d,'count':updatedStatus['Pending']}
                    }
                    else if(d['status'] === 'Approval Pending' && 'Approval Pending' in updatedStatus) {
                        return {...d,'count':updatedStatus['Approval Pending']}
                    }
                    else if(d['status'] === 'Progress' && 'Progress' in updatedStatus) {
                        return {...d,'count':updatedStatus['Progress']}
                    }
                    else if(d['status'] === 'Completed' && 'Completed' in updatedStatus) {
                        return {...d,'count':updatedStatus['Completed']}
                    }
                    return {...d}
                })
                console.log('total count ---> ',totalCount)
                state.data = [...data]
                console.log('state.data',state.data)
            
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