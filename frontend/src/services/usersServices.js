import api from '../api/api'

async function showUsers(){

    try {

        const response=await api.get('/users/')

        const data=response.data

        return data
        
    } catch (error) {
        return error.response.data
    }

}

async function getUserById(id){
    try {
        const response=await api.get(`/users/${id}`)

        const data=response.data

        return data
        
    } catch (error) {
        return error.response.data
    }
}

async function createUser(id,cpf,phone,email,rg){
    try {

        const response=await api.post(`/users/${id}`,{cpf,phone,email,rg})

        const data=response.data

        return data
        
    } catch (error) {
        return error.response.data
    }
}

async function filterUsers(user){
    try {

        const response=await api.post(`/users/filter/users`,user)

        const data=response.data

        return data
        
    } catch (error) {
        return error.response.data
    }
}

const usersServices={
    showUsers,
    createUser,
    getUserById,
    filterUsers
}

export default usersServices