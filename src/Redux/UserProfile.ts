import { createSlice } from "@reduxjs/toolkit";
import {UserProfile} from "../Interface/AllInfoInterface"
const userProfile:UserProfile = {
    username: "",
    email: "",
    img_url:""
}

export const profileSlice = createSlice({
    name: "profileSlice",
    initialState: { value: userProfile },
    reducers: {
        getUserDataR: (state, action) => {
            state.value = action.payload
        }
    }
})



export const {getUserDataR} = profileSlice.actions
export default profileSlice.reducer