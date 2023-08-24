import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import creditServices from '../services/creditServices'

const initialState={
    creditApplications:[],
    requestedCredits:null,
    loading:false,
    errors:null,
    success:false
}

export const showCreditApplications=createAsyncThunk('auth/showCreditApplications',async (thunkAPI)=>{

    const response=await creditServices.showCreditApplications()

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

export const acceptCreditRequest=createAsyncThunk('auth/acceptCreditRequest',async (data,thunkAPI)=>{

    const response=await creditServices.acceptCreditRequest(data.id)

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

export const denyCreditRequest=createAsyncThunk('auth/denyCreditRequest',async (data,thunkAPI)=>{

    const response=await creditServices.denyCreditRequest(data.id)

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

export const filterCreditapplications=createAsyncThunk('auth/filterCreditapplications',async (data,thunkAPI)=>{

    const response=await creditServices.filterCreditapplications(data)

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

export const getCreditRequestById=createAsyncThunk('auth/getCreditRequestById',async (data,thunkAPI)=>{

    const response=await creditServices.getCreditRequestById(data.id)

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

const creditSlice=createSlice({
    name:'credit',
    initialState,
    reducers:{
        resetErrors:function(state){
            state.errors=null
        }
    },
    extraReducers:function(build){
        build
        .addCase(showCreditApplications.fulfilled,(state,action)=>{
            state.creditApplications=action.payload
            state.loading=false
            state.errors=null
        })
        .addCase(showCreditApplications.pending,(state)=>{
            state.loading=true
            state.errors=null
        })
        .addCase(showCreditApplications.rejected,(state,action)=>{
            state.errors=action.payload
            state.auth=null
            state.loading=false
        })
        .addCase(acceptCreditRequest.fulfilled,(state,action)=>{
            state.creditApplications=state.creditApplications.filter(creditApplication=>creditApplication.id!==action.payload.id)
            state.loading=false
            state.errors=null
        })
        .addCase(acceptCreditRequest.pending,(state)=>{
            state.loading=true
            state.errors=null
        })
        .addCase(acceptCreditRequest.rejected,(state,action)=>{
            state.errors=action.payload
            state.auth=null
            state.loading=false
        })
        .addCase(denyCreditRequest.fulfilled,(state,action)=>{
            state.creditApplications=state.creditApplications.filter(creditApplication=>creditApplication.id!==action.payload.id)
            state.loading=false
            state.errors=null
        })
        .addCase(denyCreditRequest.pending,(state)=>{
            state.loading=true
            state.errors=null
        })
        .addCase(denyCreditRequest.rejected,(state,action)=>{
            state.errors=action.payload
            state.auth=null
            state.loading=false
        })
        .addCase(getCreditRequestById.fulfilled,(state,action)=>{
            state.requestedCredits=action.payload
            state.loading=false
            state.errors=null
        })
        .addCase(getCreditRequestById.pending,(state)=>{
            state.loading=true
            state.errors=null
        })
        .addCase(getCreditRequestById.rejected,(state,action)=>{
            state.errors=action.payload
            state.auth=null
            state.loading=false
        })
        .addCase(filterCreditapplications.fulfilled,(state,action)=>{
            state.creditApplications=action.payload
            state.loading=false
            state.errors=null
        })
        .addCase(filterCreditapplications.pending,(state)=>{
            state.loading=true
            state.errors=null
        })
        .addCase(filterCreditapplications.rejected,(state,action)=>{
            state.errors=action.payload
            state.auth=null
            state.loading=false
        })
    }
    
})

export const {resetErrors}=creditSlice.actions
export default creditSlice.reducer