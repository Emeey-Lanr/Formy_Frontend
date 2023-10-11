import { createSlice } from "@reduxjs/toolkit";

interface ModalForm {
    deleteFormModalS: boolean;
    createModal: boolean;
    deleteNumberId: 0 | 1;
    deletePayload: string;
     registeredInfoModalS:boolean
}
const modalValue:ModalForm = {
    deleteFormModalS: false,
    createModal: false,
    // the parents hold 0, the child holds one
    deleteNumberId: 0,
    deletePayload: "",
    
    registeredInfoModalS:false
}

export const modalSlice = createSlice({
    name: "slice",
    initialState: { value: modalValue },
    reducers: {
        deleteFormModalR: (state, action) => {
            state.value.deleteNumberId = action.payload.deleteNumberId
            state.value.deletePayload = action.payload.payload

            const switchState = (stateC:boolean) => {
                state.value.deleteFormModalS = stateC
            }
            switch (state.value.deleteFormModalS) {
                case false: {
                    return switchState(true)
                };
                default: {
                    return switchState(false)
                 }
            }
        },
        createFormModalR: (state, action) => {
           
                state.value.createModal = action.payload
          
            
        }
        
    }
})



export const {deleteFormModalR, createFormModalR} =  modalSlice.actions
export default modalSlice.reducer