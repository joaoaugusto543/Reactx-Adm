import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import authServices from '../services/authServices'

const initialState={
    auth:localStorage.getItem('userAdm') ? JSON.parse(localStorage.getItem('userAdm')) : null,
    loading:false,
    errors:null
}

export const login=createAsyncThunk('auth/login',async (data,thunkAPI)=>{

    const response=await authServices.login(data.cpf,data.password)

    if(response.authenticationError || response.error){
        const errors=response.errors
        return thunkAPI.rejectWithValue(errors)
    }

    localStorage.setItem('userAdm',JSON.stringify(response.userAdm))
    localStorage.setItem('token',response.token)

    return response
})

export const logout=createAsyncThunk('auth/logout',async ()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('userAdm')
})

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        resetErrors:function(state){
            state.errors=null
        }
    },
    extraReducers:function(build){
        build
        .addCase(login.fulfilled,(state,action)=>{
            state.auth=action.payload.userAdm
            state.loading=false
            state.errors=null
        })
        .addCase(login.pending,(state)=>{
            state.loading=true
            state.auth=null
            state.errors=null
        })
        .addCase(login.rejected,(state,action)=>{
            state.errors=action.payload
            state.auth=null
            state.loading=false
        })
        .addCase(logout.fulfilled,(state,action)=>{
            state.auth=null
            state.loading=false
            state.errors=null
        })
        .addCase(logout.pending,(state)=>{
            state.loading=true
            state.auth=null
            state.errors=null
        })
        .addCase(logout.rejected,(state,action)=>{
            state.errors=true
            state.auth=null
            state.loading=false
        })
    }
    
})

export const {resetErrors}=authSlice.actions
export default authSlice.reducer