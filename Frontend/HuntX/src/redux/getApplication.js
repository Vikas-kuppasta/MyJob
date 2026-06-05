import { createSlice } from "@reduxjs/toolkit";

const application  = createSlice({
    name:"application",
    initialState:{
        appliedJobs:[],
        jobApplicants:{},
    },
    reducers:{
        setAppliedJob:(state,action)=>{
            state.appliedJobs = action.payload;
        },
        setApplicantJob:(state,action)=>{
            state.jobApplicants = action.payload;
        },
    }
});

export const {setAppliedJob,setApplicantJob} = application.actions;
export default application.reducer;