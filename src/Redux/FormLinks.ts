import { createSlice } from "@reduxjs/toolkit";
import { LinkInterFace } from "../Interface/AllInfoInterface";

let linkDetails:LinkInterFace[] = []

export const linkSlice = createSlice({
    name: "linkslice",
    initialState: {value:linkDetails},
    reducers: {
        getLinkR: (state, action) => {
            state.value = action.payload
        },
        searchLinkR: (state, action) => {
          
            if(action.payload.text !== ""){
             state.value = state.value.filter((details)=>details.form_title.toUpperCase().indexOf(`${action.payload.text}`) > -1)
            } else {
             state.value = action.payload.links;
            }
             
           
            
         
            
            
        }
    }
})


export const {getLinkR, searchLinkR} = linkSlice.actions
export default linkSlice.reducer