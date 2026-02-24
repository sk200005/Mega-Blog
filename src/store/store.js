import { configureStore } from "@reduxjs/toolkit";
import authSliceReducers from "./authSlice"

export  const store = configureStore({
    reducer :{
        auth : authSliceReducers
    }
})

