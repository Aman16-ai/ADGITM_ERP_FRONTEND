import { createSlice } from "@reduxjs/toolkit";


export const globalModalSlice = createSlice({
    name:"globalModal",
    initialState: {
        open:false
    },
    reducers : {
        setOpen : (state,action) => {
            console.log('modal reducer value',action.payload)
            state.open = action.payload
        }
    }
})

export const selectModalOpen = (state) => state.globalModal.open
export const {setOpen} = globalModalSlice.actions
export default globalModalSlice.reducer