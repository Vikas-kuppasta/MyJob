import { createSlice } from "@reduxjs/toolkit";

const getJob = createSlice({
    name:"job",
    initialState:{
        Jobs:[],
        adminJobs:[],
        savedJobs:[],
        companyJobs:[],
        singleJob:null,
    },
    reducers:{
        setJob:(state,action)=>{
            state.Jobs= action.payload;
        },
        setAdminJobs:(state,action)=>{
            state.adminJobs=action.payload;
        },
        setSingleJob:(state,action)=>{
            state.singleJob = action.payload;
        },
        setSavedJob:(state,action)=>{
            state.savedJobs = action.payload;
        },
        setCompanyJobs:(state,action)=>{
            state.companyJobs = action.payload;
        },
    }
});

export const {setJob,setSingleJob,setAdminJobs,setSavedJob,setCompanyJobs} = getJob.actions;
export default getJob.reducer;