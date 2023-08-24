import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import usersBannedServices from '../services/usersBannedServices'

const initialState={
    userBanned:null,
    usersBanned:[],
    loading:false,
    errors:null
}

export const createUserBanned=createAsyncThunk('auth/createUserBanned',async (data,thunkAPI)=>{
 
    const response=await usersBannedServices.createUserBanned(data.id)

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

export const showUsersBanned=createAsyncThunk('auth/showUsersBanned',async (thunkAPI)=>{
 
    const response=await usersBannedServices.showUsersBanned()

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


export const getUserBannedById=createAsyncThunk('auth/getUserBannedById',async (data,thunkAPI)=>{
 
    const response=await usersBannedServices.getUserBannedById(data.id)

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

export const unBanUserBanned=createAsyncThunk('auth/unBanUserBanned',async (data,thunkAPI)=>{
 
    const response=await usersBannedServices.unBanUserBanned(data.id)

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

export const filterUsersBanned=createAsyncThunk('auth/filterUsersBanned',async (data,thunkAPI)=>{

    const response=await usersBannedServices.filterUsersBanned(data)

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


const userBanned=createSlice({
    name:'userBanned',
    initialState,
    reducers:{
        resetErrors:function(state){
            state.errors=null
        }
    },
    extraReducers:function(build){
        build
        .addCase(createUserBanned.fulfilled,(state,action)=>{
            state.loading=false
            state.errors=null
        })
        .addCase(createUserBanned.pending,(state)=>{
            state.loading=true
            state.errors=null
        })
        .addCase(createUserBanned.rejected,(state,action)=>{
            state.errors=action.payload
            state.loading=false
        })
        .addCase(showUsersBanned.fulfilled,(state,action)=>{
            state.usersBanned=action.payload
            state.loading=false
            state.errors=null
        })
        .addCase(showUsersBanned.pending,(state)=>{
            state.usersBanned=null
            state.loading=true
            state.errors=null
        })
        .addCase(showUsersBanned.rejected,(state,action)=>{
            state.usersBanned=null
            state.errors=action.payload
            state.loading=false
        })
        .addCase(getUserBannedById.fulfilled,(state,action)=>{
            state.userBanned=action.payload
            state.loading=false
            state.errors=null
        })
        .addCase(getUserBannedById.pending,(state)=>{
            state.userBanned=null
            state.loading=true
            state.errors=null
        })
        .addCase(getUserBannedById.rejected,(state,action)=>{
            state.userBanned=null
            state.errors=action.payload
            state.loading=false
        })
        .addCase(unBanUserBanned.fulfilled,(state,action)=>{
            state.usersBanned=state.usersBanned.filter(userBanned=>userBanned.id !== action.payload.id)
            state.loading=false
            state.errors=null
        })
        .addCase(unBanUserBanned.pending,(state)=>{
            state.loading=true
            state.errors=null
        })
        .addCase(unBanUserBanned.rejected,(state,action)=>{
            state.errors=action.payload
            state.loading=false
        })
        .addCase(filterUsersBanned.fulfilled,(state,action)=>{
            state.usersBanned=action.payload
            state.loading=false
            state.errors=null
        })
        .addCase(filterUsersBanned.pending,(state)=>{
            state.loading=true
            state.errors=null
        })
        .addCase(filterUsersBanned.rejected,(state,action)=>{
            state.errors=action.payload
            state.loading=false
        })

    }
    
})

export const {resetErrors}=userBanned.actions
export default userBanned.reducer