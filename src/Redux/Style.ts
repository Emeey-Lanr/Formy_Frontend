import { createSlice } from "@reduxjs/toolkit"

const styles = {
    bgSize: "rcreatebg",
    hideShowSideBar: "hideSideBar",
    // Navbar
    dashboardSectionIdentification:""
}
export const styleSlice = createSlice({
    name: "style",
    initialState: {value:styles},
    reducers: {
        changeDashSectionIdentificationR: (state, action) => {
             state.value.dashboardSectionIdentification = action.payload  
        },
        
        increaseReduceSizeR: (state, action) => {
            const changeStyle = (name:string) => {
                state.value.bgSize = name
            }
            switch (state.value.bgSize) {
                case "rcreatebg": {
                    return changeStyle("icreatebg")
                };
                default: {
                    return changeStyle("rcreatebg")
                }
            }
        },
        showSideBar: (state, action) => {
            state.value.hideShowSideBar = "showSideBar"
       
        },
        hideShowSideBarR: (state, action) => {
     
            state.value.hideShowSideBar = "hideSidebar"
          
            if (state.value.hideShowSideBar === "hideSideBar") {
            
               state.value.hideShowSideBar = "showSideBar";
            } else {
           
              state.value.hideShowSideBar = "hideSideBar";
            }
          
        }

        
    }
})


export const { changeDashSectionIdentificationR,increaseReduceSizeR, showSideBar, hideShowSideBarR} = styleSlice.actions
export default styleSlice.reducer
