import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authslice'
import getJob from './getJobSlice'
const store = configureStore({
    reducer:{
        auth:authSlice,
        job:getJob
    }
});

export default store;