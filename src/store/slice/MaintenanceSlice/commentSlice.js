import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllMaintenanceComment, postMaintenanceComment } from "../../../services/Maintenance";

export const postMaintenanceCommentThunk = createAsyncThunk("maintenanceComment/postComment",async(commentPayload,thunkApi)=> {
    try {
        const result = await postMaintenanceComment(commentPayload)
        console.log('comment thunk result',result)
        return result
    }
    catch(err) {
        return thunkApi.rejectWithValue
    }
})
export const getMaintenanceCommentThunk = createAsyncThunk("maintenanceComment/getAllComment",async(id,thunkApi) => {
    try {
        console.log("running get comment thunk id",id)
        const result = await getAllMaintenanceComment(id)
        console.log('all comment result ',result)
        return result
    }
    catch(err) {
        return thunkApi.rejectWithValue
    }
})
export const commentSlice = createSlice({
    name : 'maintenanceComment',
    initialState : {
        payload : {
            "maintenanceIssue" : null,
            "comment" : ""
        },
        allComments : [],
        isLoading : false
    },
    reducers : {
        setPayload : (state,action) => {
            state.payload = {...state.payload,[action.payload.name] : action.payload.value}
        }
    },
    extraReducers : {
        [postMaintenanceCommentThunk.fulfilled] : (state,action) => {
            const commentResponse = action.payload
            const comment = {...commentResponse,commented_by: {
                username:"You"
            }}
            state.allComments = [...state.allComments,comment]
            state.isLoading = false
        },
        [postMaintenanceCommentThunk.pending]:(state,action) => {
            state.isLoading = true
        },
        [getMaintenanceCommentThunk.fulfilled] : (state,action) => {
            state.allComments = action.payload
        },
        [getMaintenanceCommentThunk.rejected] : (state,action) => {
            state.allComments = []
        }
    }
})

export const {setPayload} = commentSlice.actions
export const selectCommentPayload = (state) => state.maintenanceComment.payload
export const selectAllComments = (state) => state.maintenanceComment.allComments
export const selectIsLoading = (state) => state.maintenanceComment.isLoading
export default commentSlice.reducer