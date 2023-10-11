import { createSlice } from "@reduxjs/toolkit";
import { FormFillDetails } from "../Interface/AllInfoInterface";

const formDetails:FormFillDetails = {
    form_title:"",
    form_description:"",
  formData:[]
}

export const fillFormSlice = createSlice({
    name: "fillFormSlice",
    initialState: {value:formDetails},
    reducers: {
        showFormDetails: (state, action) => {
               state.value.form_title = action.payload.title;
               state.value.form_description = action.payload.description;
            state.value.formData = action.payload.data
         
        },
        pickOptionR: (state, action) => {
            state.value.formData[action.payload.parentId].option.map((data, id) => {
                if (id === action.payload.childId) {
                  data.status = true
                } else {
                    data.status = false
              }
          })  
        },
        fillInputR: (state, action) => {
            state.value.formData[action.payload.id].anwser = action.payload.answer
        }
    }
})

export const  {showFormDetails, pickOptionR, fillInputR} = fillFormSlice.actions
export  default fillFormSlice.reducer