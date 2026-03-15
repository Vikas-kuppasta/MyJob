import { createSlice } from "@reduxjs/toolkit";

const getJob = createSlice({
    name:"job",
    initialState:{
        Jobs:[],
        singleJob:null,
    },
    reducers:{
        setJob:(state,action)=>{
            state.Jobs= action.payload;
        },
        setSingleJob:(state,action)=>{
            state.singleJob = action.payload;
        }
    }
});

export const {setJob,setSingleJob} = getJob.actions;
export default getJob.reducer;