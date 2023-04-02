import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    currUser:{
        username:'',
        email:'',
        gender:'',
        joined:''
    },
    loggedInUser:{
        username:'',
        email:'',
        gender:'',
        joined:''
    },
    // username:'',
    // email:'',
    accessToken:'',    
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setCurrUser: (state, user) =>{
            state.currUser = user.payload;
        },
        setLoggedInUser: (state, user) =>{
            state.LoggedInUser = user.payload;
        },
        setAccessToken: (state, user) =>{
            state.accessToken = user.payload;
        },
    }
})

export const {setCurrUser,setLoggedInUser,setAccessToken} = userSlice.actions;
export default userSlice.reducer;