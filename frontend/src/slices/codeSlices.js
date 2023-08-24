import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import codeServices from '../services/codeServices'

const initialState={
    encryptedCode:null,
    loading:false,
    errors:null
}

export const sendVerificationCode=createAsyncThunk('auth/sendVerificationCode',async (data,thunkAPI)=>{

    const response=await codeServices.sendVerificationCode(data)

    if(response.error){
        const errors=response.error
        return thunkAPI.rejectWithValue(errors)
    }

    return response
})


const codeSlice=createSlice({
    name:'code',
    initialState,
    reducers:{
        resetErrors:function(state){
            state.errors=null
        }
    },
    extraReducers:function(build){
        build
        .addCase(sendVerificationCode.fulfilled,(state,action)=>{
            state.encryptedCode=action.payload.encryptedCode
            state.loading=false
            state.errors=null
        })
        .addCase(sendVerificationCode.pending,(state)=>{
            state.loading=true
            state.auth=null
            state.errors=null
        })
        .addCase(sendVerificationCode.rejected,(state,action)=>{
            state.errors=action.payload
            state.auth=null
            state.loading=false
        })
    }
    
})

export const {resetErrors}=codeSlice.actions
export default codeSlice.reducer