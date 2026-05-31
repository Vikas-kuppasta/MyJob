import { createSlice } from "@reduxjs/toolkit";

const application  = createSlice({
    name:"application",
    initialState:{
        appliedJobs:[],
    },
    reducers:{
        setAppliedJob:(state,action)=>{
            state.appliedJobs = action.payload;
    }
    }
});

export const {setAppliedJob} = application.actions;
export default application.reducer;