import { createSlice } from "@reduxjs/toolkit";
import { DashDBoardDetails } from "../Interface/AllInfoInterface";
const value:DashDBoardDetails = {
    lastestFormResponses: [],
    lastestForms: [],
    topPerformingForm: [],
    topThreeReponses: [],
    topThreeName:[]
}



export const dashDetailsSlice = createSlice({
    name: "dashDetailsSlice",
    initialState: { value: value },
    reducers: {
        getDashDetailsR: (state, action) => {
            state.value.lastestFormResponses = action.payload.response
             state.value.lastestForms = action.payload.form
            state.value.topPerformingForm = action.payload.topThree

                    
            if (Number(action.payload.topThree.length) === 1) {
                if (state.value.topThreeName.length < 1) {
                      state.value.topThreeName.push(
                        action.payload.topThree[0].form_title
                      );
                      state.value.topThreeReponses.push(
                        action.payload.topThree[0].totalSubmit
                      );
                }
                
        }else if(Number(action.payload.topThree.length) === 2){
                if (state.value.topThreeName.length < 2) {
                    state.value.topThreeName.push(
                        action.payload.topThree[0].form_title,
                        action.payload.topThree[1].form_title
                    );
                    state.value.topThreeReponses.push(
                        action.payload.topThree[0].totalSubmit,
                        action.payload.topThree[1].totalSubmit
                    );
                
                }
            } else if (Number(action.payload.topThree.length) === 3) {
                if (state.value.topThreeName.length < 3) {
                    state.value.topThreeName.push(
                        action.payload.topThree[0].form_title,
                        action.payload.topThree[1].form_title,
                        action.payload.topThree[2].form_title
                    );
                    state.value.topThreeReponses.push(
                        action.payload.topThree[0].totalSubmit,
                        action.payload.topThree[1].totalSubmit,
                        action.payload.topThree[2].totalSubmit
                    );
                }
        }
           

          
        }
    }
})




export const {getDashDetailsR } = dashDetailsSlice.actions

export default dashDetailsSlice.reducer