import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import usersServices from '../services/usersWaitingServices'

const initialState={
    usersWaiting:[],
    userWaiting:null,
    errors:null,
    loading:false
}

export const showUsersWaiting=createAsyncThunk('usersWaiting/showUsersWaiting',async (thunkAPI)=>{
    const response=await usersServices.showUsersWaiting()

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

export const getUserWaitingById=createAsyncThunk('usersWaiting/getUserWaitingById',async (data,thunkAPI)=>{
    const response=await usersServices.getUserWaitingById(data.id)

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

export const deleteUserWaiting=createAsyncThunk('usersWaiting/deleteUserWaiting',async (data,thunkAPI)=>{
    const response=await usersServices.deleteUserWaiting(data.id)

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

export const filterUsersWaiting=createAsyncThunk('usersWaiting/filterUsersWaiting',async (data,thunkAPI)=>{
    const response=await usersServices.filterUsersWaiting(data)

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


const usersWaitingSlice=createSlice({
    name:'usersWaiting',
    initialState,
    reducers:{
        resetErrors:function(state){
            state.errors=null
        }
    },
    extraReducers:function(build){
        build
        .addCase(showUsersWaiting.fulfilled,(state,action)=>{
            state.usersWaiting=action.payload
            state.loading=false
            state.errors=null
        })
        .addCase(showUsersWaiting.pending,(state)=>{
            state.usersWaiting=null
            state.loading=true
            state.errors=null
        })
        .addCase(showUsersWaiting.rejected,(state,action)=>{
            state.usersWaiting=null
            state.loading=false
            state.errors=action.payload
        })
        .addCase(getUserWaitingById.fulfilled,(state,action)=>{
            state.userWaiting=action.payload
            state.loading=false
            state.errors=null
        })
        .addCase(getUserWaitingById.pending,(state)=>{
            state.userWaiting=null
            state.loading=true
            state.errors=null
        })
        .addCase(getUserWaitingById.rejected,(state,action)=>{
            state.userWaiting=null
            state.loading=false
            state.errors=action.payload
        })
        .addCase(deleteUserWaiting.fulfilled,(state,action)=>{
            state.usersWaiting=state.usersWaiting.filter(userWaiting=>userWaiting.id!==action.payload.id)
            state.loading=false
            state.errors=null
        })
        .addCase(deleteUserWaiting.pending,(state)=>{
            state.loading=true
            state.errors=null
        })
        .addCase(deleteUserWaiting.rejected,(state,action)=>{
            state.loading=false
            state.errors=action.payload
        })
        .addCase(filterUsersWaiting.fulfilled,(state,action)=>{
            state.usersWaiting=action.payload
            state.loading=false
            state.errors=null
        })
        .addCase(filterUsersWaiting.pending,(state)=>{
            state.loading=true
            state.errors=null
        })
        .addCase(filterUsersWaiting.rejected,(state,action)=>{
            state.loading=false
            state.errors=action.payload
        })
    }
    
})

export const {resetErrors}=usersWaitingSlice.actions
export default usersWaitingSlice.reducer