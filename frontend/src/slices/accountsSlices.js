import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import accountsServices from '../services/accountsServices'

const initialState={
    account:null,
    loading:false,
    errors:null
}

export const getAccountById=createAsyncThunk('auth/getAccountById',async (data,thunkAPI)=>{

    const response=await accountsServices.getAccountById(data.id)

    if(response.error){
        const error=response.error

        if(error==='Invalid token.' || error==='Token was not provided'){
            localStorage.removeItem('token')
            localStorage.removeItem('userAdm')
            window.location.reload()
        }

        return thunkAPI.rejectWithValue(error)
    }

    return response

})


const accountSlice=createSlice({
    name:'account',
    initialState,
    reducers:{
        resetErrors:function(state){
            state.errors=null
        }
    },
    extraReducers:function(build){
        build
        .addCase(getAccountById.fulfilled,(state,action)=>{
            state.account=action.payload
            state.loading=false
            state.errors=null
        })
        .addCase(getAccountById.pending,(state)=>{
            state.loading=true
            state.account=null
            state.errors=null
        })
        .addCase(getAccountById.rejected,(state,action)=>{
            state.errors=action.payload
            state.account=null
            state.loading=false
        })
        
    }
    
})

export const {resetErrors}=accountSlice.actions
export default accountSlice.reducer