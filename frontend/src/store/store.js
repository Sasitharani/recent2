import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "../reducers/adminSlice";

export const store=configureStore({
    reducer:{ 
         adminReducers:adminSlice,  
    }
}
)
export default store;