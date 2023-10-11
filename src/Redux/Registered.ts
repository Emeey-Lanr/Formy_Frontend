import { createSlice } from "@reduxjs/toolkit";
import { RegisteredInfo } from "../Interface/AllInfoInterface";

const registerDashBoardInfo: RegisteredInfo = {
 currentId:"",
  currentEmail: "",
  currentData: [],
  form_title: "",
  form_link: "",
  form_description: "",
  form_registration_data: [],
  form_overall_analysis: [],
};

export const registeredSlice = createSlice({
    name: "info",
    initialState: {value:registerDashBoardInfo},
    reducers: {
        getRegistrationInfoR: (state, action) => { 
            state.value.form_description = action.payload.description
            state.value.form_link = action.payload.link
            state.value.form_title = action.payload.title
            state.value.form_registration_data = action.payload.data
        },
        getUserDetailsR: (state, action) => {
            state.value.currentId = `${action.payload.userId}`
            state.value.currentData = state.value.form_registration_data[action.payload.id].form_details
            state.value.currentEmail = action.payload.userEmail
        },
        processOverallDetailsR: (state, action) => {
            if (action.payload.length > 0) {
                state.value.form_registration_data.map((details) => {
                    details.form_details.map((data) => {
                        const ifQuestionExist = state.value.form_overall_analysis.find((info) => info.question === data.question)
                        if (!ifQuestionExist) {
                            state.value.form_overall_analysis.push(
                                {
                                    question:data.question,
                                    ans:[
                                        {
                                            picked: `${data.option.length > 0 ? data.option.filter((info) => info.status === true)[0].answer.toLowerCase() : data.anwser.toLowerCase()}` ,
                                            state: 1,
                                            users:[`${details.user_email}`]
                                            
                                        }
                                    ]

                                }
                            )
                            
                        }else{
                            const checkIfAnsExist = ifQuestionExist.ans.find((ansInfo, id) => ansInfo.picked === (data.option.length > 0 ? data.option.filter((info) => info.status)[0].answer.toLowerCase() : data.anwser.toLowerCase()))

                           
                            if (checkIfAnsExist) {
                                   checkIfAnsExist.state = checkIfAnsExist.state + 1
                                   let seeIfNameExist = checkIfAnsExist.users.find((name) => name === details.user_email)
                                   if (!seeIfNameExist) {
                                       checkIfAnsExist.users.push(details.user_email)
                                   }
                               } else {
                                   ifQuestionExist.ans.push({
                                       picked: `${data.option.length > 0 ? data.option.filter((info) => info.status)[0].answer.toLowerCase() : data.anwser.toLowerCase()}`,
                                       state: 1,
                                       users:[`${details.user_email}`]
                                   })
                               }

                        }
                      
                  })
                    
                })
            }
        },
        viewDetailsFromDashboardR: (state, action) => {
            //  state.value.currentId = 
            state.value.currentData = action.payload
            state.value.currentEmail = action.payload.user_email
            
        }



        
    }
}) 


export const  {getRegistrationInfoR, getUserDetailsR, processOverallDetailsR, viewDetailsFromDashboardR} = registeredSlice.actions
export default registeredSlice.reducer