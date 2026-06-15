import { createSlice } from "@reduxjs/toolkit";

const application  = createSlice({
    name:"application",
    initialState:{
        applicantProfile:{},
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
        setApplicantProfile:(state,action)=>{
            state.applicantProfile = action.payload;
        },
    }
});

export const {setAppliedJob,setApplicantJob,setApplicantProfile} = application.actions;
export default application.reducer;