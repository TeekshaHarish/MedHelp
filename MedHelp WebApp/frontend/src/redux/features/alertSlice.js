import {createSlice} from "@reduxjs/toolkit"

const alertSlice=createSlice({
    name:"alerts",
    initialState:{
        loading:false
    },
    reducers:{
        showLoading:(state)=>{
            state.loading=true;
        },
        hideLoading:(state)=>{
            state.loading=false;
        }
    }
})
export default alertSlice;
export const {showLoading,hideLoading}=alertSlice.actions;