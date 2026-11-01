import { configureStore } from "@reduxjs/toolkit"
import auth from "../slice/Auth"
export const store=configureStore({
    reducer:{
        auth:auth
    }
}) 
