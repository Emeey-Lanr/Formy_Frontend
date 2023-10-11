import { createSlice } from "@reduxjs/toolkit";
import { FormCreation} from "../Interface/AllInfoInterface"

const form:FormCreation[] = []

export  const formSlice = createSlice({
    name: "form",
    initialState: {value: form },
    reducers: {
        addQuestionR: (state, action) => {
            state.value.push(action.payload)
        },
        pickAnswerR: (state, action) => {
            // state.value[action.payload.parent].option[ ].status = true
            const currentQuestion = state.value.find((details, id) => id === action.payload.parent)
            currentQuestion?.option.map((details, id) => {
                if (id === action.payload.child) {
                    details.status = true
                } else {
                    details.status = false
                }
            })
        },
        removeQuestion: (state, action) => {
            state.value = state.value.filter((_,id)=> id !== action.payload)
        }
        
    }
})




export const {addQuestionR, pickAnswerR, removeQuestion} = formSlice.actions

export default formSlice.reducer