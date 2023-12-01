import { createSlice } from "@reduxjs/toolkit";


export const globalModalSlice = createSlice({
    name:"globalModal",
    initialState: {
        open:false,
        type:'comment',
        dialogYes : false
    },
    reducers : {
        setOpen : (state,action) => {
            console.log('modal reducer value',action.payload)
            state.open = action.payload
        },
        updateType : (state,action) => {
            state.type = action.payload
        },
        updateAction : (state,action) => {
            console.log('modal action value',action.payload)
            state.dialogYes = action.payload
        }
    }
})

export const selectModalOpen = (state) => state.globalModal.open
export const selectModalType = (state) => state.globalModal.type
export const selectModalAction = (state) => state.globalModal.dialogYes
export const {setOpen,updateType,updateAction} = globalModalSlice.actions
export default globalModalSlice.reducer