import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import usersServices from '../services/usersServices'

const initialState={
    users:[],
    user:null,
    loading:false,
    errors:null
}

export const showUsers=createAsyncThunk('auth/showUsers',async (thunkAPI)=>{

    const response=await usersServices.showUsers()

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

export const createUser=createAsyncThunk('auth/createUser',async (data,thunkAPI)=>{

    const {id,cpf,phone,email,rg}=data

    const response=await usersServices.createUser(id,cpf,phone,email,rg)

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

export const getUserById=createAsyncThunk('auth/getUserById',async (data,thunkAPI)=>{

    const response=await usersServices.getUserById(data.id)

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

export const filterUsers=createAsyncThunk('auth/filterUsers',async (data,thunkAPI)=>{

    const response=await usersServices.filterUsers(data)

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

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        resetErrors:function(state){
            state.errors=null
        }
    },
    extraReducers:function(build){
        build
        .addCase(showUsers.fulfilled,(state,action)=>{
            state.users=action.payload
            state.loading=false
            state.errors=null
        })
        .addCase(showUsers.pending,(state)=>{
            state.loading=true
            state.users=null
            state.errors=null
        })
        .addCase(showUsers.rejected,(state,action)=>{
            state.errors=action.payload
            state.users=[]
            state.loading=false
        })
        .addCase(createUser.fulfilled,(state,action)=>{
            state.loading=false
            state.errors=null
        })
        .addCase(createUser.pending,(state)=>{
            state.loading=true
            state.errors=null
        })
        .addCase(createUser.rejected,(state,action)=>{
            state.errors=action.payload
            state.loading=false
        })   
        .addCase(getUserById.fulfilled,(state,action)=>{
            state.user=action.payload
            state.loading=false
            state.errors=null
        })
        .addCase(getUserById.pending,(state)=>{
            state.user=null
            state.loading=true
            state.errors=null
        })
        .addCase(getUserById.rejected,(state,action)=>{
            state.user=null
            state.errors=action.payload
            state.loading=false
        })
        .addCase(filterUsers.fulfilled,(state,action)=>{
            state.users=action.payload
            state.loading=false
            state.errors=null
        })
        .addCase(filterUsers.pending,(state)=>{
            state.users=null
            state.loading=true
            state.errors=null
        })
        .addCase(filterUsers.rejected,(state,action)=>{
            state.errors=action.payload
            state.loading=false
        })         
    }
    
})

export const {resetErrors}=userSlice.actions
export default userSlice.reducer