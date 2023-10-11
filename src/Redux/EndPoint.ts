import { createSlice } from "@reduxjs/toolkit"
let Api_URL  =  "https://formy-api.onrender.com"
// let Api_URL = "http://localhost:4056"
const endPoints = {
  user: `${Api_URL}/user`,
  form: `${Api_URL}/form`,
  register: `${Api_URL}/register`,
};


export const endPointSlice = createSlice({
    name: "endpointSlice",
    initialState: {endPoints},
    reducers: {
        
    }
})


export const {} = endPointSlice.actions
export default endPointSlice.reducer

