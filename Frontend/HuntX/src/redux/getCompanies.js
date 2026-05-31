import { createSlice } from "@reduxjs/toolkit";

const getCompany = createSlice({
    name:"Company",
    initialState:{
        Companies:[],
        singleCompany:null,
    },
    reducers:{
        setCompanies:(state,action)=>{
            state.Companies= action.payload;
        },
        setSingleCompany:(state,action)=>{
            state.singleCompany = action.payload;
        }
    }
});

export const {setCompanies,setSingleCompany} = getCompany.actions;
export default getCompany.reducer;