import api from '../api/api'

async function showUsersAdm(){
    try {
        const response=await api.get('/usersadm')
        const data=response.data
        return data
    } catch (error) {
        return error.response.data
    }
}

async function profile(){
    try {
        const response=await api.get('/usersadm/profile')
        const data=response.data
        return data
    } catch (error) {
        return error.response.data
    }
}

async function update(userAdm){
    try {

        const response=await api.put('/usersadm/update',userAdm)
        const data=response.data
        return data
    } catch (error) {
        return error.response.data
    }
}

async function getUserAdmById(id){
    try {
        const response=await api.get(`/usersadm/${id}`)
        const data=response.data
        return data
    } catch (error) {
        return error.response.data
    }
}

async function create(newUserAdm){
    try {
        const response=await api.post(`/usersadm/`,newUserAdm)
        const data=response.data
        return data
    } catch (error) {
        return error.response.data
    }
}

async function deleteUserAdm(id){
    try {
        const response=await api.delete(`/usersadm/${id}`)
        const data=response.data
        return data
    } catch (error) {
        return error.response.data
    }
}

async function filterUsersAdm(userAdm){
    try {
        const response=await api.post('/usersadm/filter',userAdm)
        const data=response.data
        return data
    } catch (error) {
        return error.response.data
    }
}

async function forgottenPassword(userAdm){
    try {
        const response=await api.post('/usersadm/forgottenPassword',userAdm)
        const data=response.data
        return data
    } catch (error) {
        return error.response.data
    }
}

const userAdmServices={
    showUsersAdm,
    profile,
    update,
    getUserAdmById,
    create,
    deleteUserAdm,
    filterUsersAdm,
    forgottenPassword
}

export default userAdmServices