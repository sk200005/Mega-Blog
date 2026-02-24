// ************ Turn "status" as true/false **************** 

// It stores frontend state to --> remembers whether the user is logged in or not.

import { createSlice } from "@reduxjs/toolkit";

const initialState  = {
    status : false,         // On every refresh the staus defaults to false 
    userData : null 
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        login: (currState , action)=>{        // action is user Data
            currState.status = true;
            currState.userData = action.payload;
        },
        logout : (currState) =>{
            currState.status = false;
            currState.userData = null; 
        }
    }
})
export const {login, logout} = authSlice.actions ;
export default authSlice.reducer