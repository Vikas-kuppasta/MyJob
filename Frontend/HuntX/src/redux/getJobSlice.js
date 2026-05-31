import { createSlice } from "@reduxjs/toolkit";

const getJob = createSlice({
    name:"job",
    initialState:{
        Jobs:[],
        adminJobs:[],
        savedJobs:[],
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
    }
});

export const {setJob,setSingleJob,setAdminJobs,setSavedJob} = getJob.actions;
export default getJob.reducer;