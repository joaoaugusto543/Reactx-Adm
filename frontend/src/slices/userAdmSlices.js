import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import userAdmServices from '../services/userAdmServices'

const initialState={
    userAdm:null,
    usersAdm:[],
    loading:false,
    errors:null,
    successMessage:false,
    success:false
}

export const showUsersAdm=createAsyncThunk('userAdm/showUsersAdm',async (thunkAPI)=>{

    const response=await userAdmServices.showUsersAdm()

    if(response.errors){
        const errors=response.errors
        return thunkAPI.rejectWithValue(errors)
    }

    if(response.error){
        const error=response.error

        if(error==='Invalid token.' || error==='User does not exist' || error==='Token was not provided'){
            localStorage.removeItem('token')
            localStorage.removeItem('userAdm')
            window.location.reload()
        }

        return thunkAPI.rejectWithValue(error)
    }

    return response
})

export const profile=createAsyncThunk('userAdm/profile',async (thunkAPI)=>{

    const response=await userAdmServices.profile()

    if(response.errors){
        const errors=response.errors
        return thunkAPI.rejectWithValue(errors)
    }

    if(response.error){
        const error=response.error

        if(error==='Invalid token.' || error==='User does not exist' || error==='Token was not provided'){
            localStorage.removeItem('token')
            localStorage.removeItem('userAdm')
            window.location.reload()
        }

        return thunkAPI.rejectWithValue(error)
    }

    return response
})

export const update=createAsyncThunk('userAdm/update',async (data,thunkAPI)=>{

    const response=await userAdmServices.update(data)

    if(response.errors){
        const errors=response.errors
        return thunkAPI.rejectWithValue(errors)
    }

    if(response.error){
        const error=response.error

        if(error==='Invalid token.' || error==='User does not exist' || error==='Token was not provided'){
            localStorage.removeItem('token')
            localStorage.removeItem('userAdm')
            window.location.reload()
        }

        return thunkAPI.rejectWithValue(error)
    }
    return response
})

export const getUserAdmById=createAsyncThunk('userAdm/getUserAdmById',async (data,thunkAPI)=>{

    const response=await userAdmServices.getUserAdmById(data.id)

    if(response.errors){
        const errors=response.errors
        return thunkAPI.rejectWithValue(errors)
    }

    if(response.error){
        const error=response.error

        if(error==='Invalid token.' || error==='User does not exist' || error==='Token was not provided'){
            localStorage.removeItem('token')
            localStorage.removeItem('userAdm')
            window.location.reload()
        }

        return thunkAPI.rejectWithValue(error)
    }
    return response
})

export const create=createAsyncThunk('userAdm/create',async (data,thunkAPI)=>{

    const response=await userAdmServices.create(data)

    if(response.errors){
        const errors=response.errors
        return thunkAPI.rejectWithValue(errors)
    }

    if(response.error){
        const error=response.error

        if(error==='Invalid token.' || error==='User does not exist' || error==='Token was not provided'){
            localStorage.removeItem('token')
            localStorage.removeItem('userAdm')
            window.location.reload()
        }

        return thunkAPI.rejectWithValue(error)
    }
    return response
})

export const deleteUserAdm=createAsyncThunk('userAdm/deleteUserAdm',async (data,thunkAPI)=>{

    const response=await userAdmServices.deleteUserAdm(data.id)

    if(response.errors){
        const errors=response.errors
        return thunkAPI.rejectWithValue(errors)
    }

    if(response.error){
        const error=response.error

        if(error==='Invalid token.' || error==='User does not exist' || error==='Token was not provided'){
            localStorage.removeItem('token')
            localStorage.removeItem('userAdm')
            window.location.reload()
        }

        return thunkAPI.rejectWithValue(error)
    }
    return response
})

export const filterUsersAdm=createAsyncThunk('userAdm/filterUsersAdm',async (data,thunkAPI)=>{

    const response=await userAdmServices.filterUsersAdm(data)

    if(response.errors){
        const errors=response.errors
        return thunkAPI.rejectWithValue(errors)
    }

    if(response.error){
        const error=response.error

        if(error==='Invalid token.' || error==='User does not exist' || error==='Token was not provided'){
            localStorage.removeItem('token')
            localStorage.removeItem('userAdm')
            window.location.reload()
        }

        return thunkAPI.rejectWithValue(error)
    }
    return response
})

export const forgottenPassword=createAsyncThunk('auth/forgottenPassword',async (data,thunkAPI)=>{

    const response=await userAdmServices.forgottenPassword(data)

    if(response.error){
        const errors=response.error
        return thunkAPI.rejectWithValue(errors)
    }

    return response
})


const userAdmSlices=createSlice({
    name:'userAdm',
    initialState,
    reducers:{
        resetSuccessMessage:function(state){
            state.successMessage=false
        },
        resetErrors:function(state){
            state.errors=false
        },
        resetSuccess:function(state){
            state.success=false
        }
    },
    extraReducers:function(build){
        build
        .addCase(showUsersAdm.fulfilled,(state,action)=>{
            state.usersAdm=action.payload
            state.loading=false
            state.errors=null
            state.successMessage=false
            state.success=true
        })
        .addCase(showUsersAdm.pending,(state)=>{
            state.loading=true
            state.usersAdm=[]
            state.errors=null
            state.successMessage=false
            state.success=false
        })
        .addCase(showUsersAdm.rejected,(state,action)=>{
            state.errors=action.payload
            state.usersAdm=null
            state.loading=false
            state.successMessage=false
            state.success=false
        })
        .addCase(profile.fulfilled,(state,action)=>{
            state.userAdm=action.payload
            state.loading=false
            state.errors=null
            state.successMessage=false
            state.success=true
        })
        .addCase(profile.pending,(state)=>{
            state.loading=true
            state.userAdm=null
            state.errors=null
            state.successMessage=false
            state.success=false
        })
        .addCase(profile.rejected,(state,action)=>{
            state.errors=action.payload
            state.userAdm=null
            state.loading=false
            state.successMessage=false
            state.success=false
        })
        .addCase(update.fulfilled,(state,action)=>{
            state.userAdm=action.payload
            state.loading=false
            state.errors=null
            state.successMessage='Conta atualizada!'
            state.success=true
        })
        .addCase(update.pending,(state)=>{
            state.loading=true
            state.errors=null
            state.successMessage=false
            state.success=false
        })
        .addCase(update.rejected,(state,action)=>{
            state.errors=action.payload
            state.loading=false
            state.successMessage=false
            state.success=false
        })
        .addCase(getUserAdmById.fulfilled,(state,action)=>{
            state.userAdm=action.payload
            state.loading=false
            state.errors=null
            state.successMessage=false
            state.success=true
        })
        .addCase(getUserAdmById.pending,(state)=>{
            state.loading=true
            state.userAdm=null
            state.errors=null
            state.successMessage=false
            state.success=false
        })
        .addCase(getUserAdmById.rejected,(state,action)=>{
            state.errors=action.payload
            state.userAdm=null
            state.loading=false
            state.successMessage=false
            state.success=false
        })
        .addCase(create.fulfilled,(state)=>{
            state.loading=false
            state.errors=null
            state.successMessage='Usuário criado!'
            state.success=true
        })
        .addCase(create.pending,(state)=>{
            state.loading=true
            state.userAdm=null
            state.errors=null
            state.successMessage=false
            state.success=false
        })
        .addCase(create.rejected,(state,action)=>{
            state.errors=action.payload
            state.userAdm=null
            state.loading=false
            state.successMessage=false
            state.success=false
        })
        .addCase(deleteUserAdm.fulfilled,(state,action)=>{
            state.usersAdm=state.usersAdm.filter(userAdm=>userAdm.id !== action.payload.id)
            state.loading=false
            state.errors=null
            state.success=true
        })
        .addCase(deleteUserAdm.pending,(state)=>{
            state.loading=true
            state.userAdm=null
            state.errors=null
            state.success=false
        })
        .addCase(deleteUserAdm.rejected,(state,action)=>{
            state.errors=action.payload
            state.userAdm=null
            state.loading=false
            state.success=false
        })
        .addCase(filterUsersAdm.fulfilled,(state,action)=>{
            state.usersAdm=action.payload
            state.loading=false
            state.errors=null
            state.success=true
        })
        .addCase(filterUsersAdm.pending,(state)=>{
            state.loading=true
            state.userAdm=null
            state.errors=null
            state.success=false
        })
        .addCase(filterUsersAdm.rejected,(state,action)=>{
            state.errors=action.payload
            state.userAdm=null
            state.loading=false
            state.success=false
        })
        .addCase(forgottenPassword.fulfilled,(state,action)=>{
            state.loading=false
            state.errors=null
            state.success=true
        })
        .addCase(forgottenPassword.pending,(state)=>{
            state.loading=true
            state.errors=null
            state.success=false
        })
        .addCase(forgottenPassword.rejected,(state,action)=>{
            state.errors=action.payload
            state.loading=false
            state.success=false
        })
    }
    
})

export const {resetSuccessMessage,resetErrors,resetSuccess}=userAdmSlices.actions
export default userAdmSlices.reducer