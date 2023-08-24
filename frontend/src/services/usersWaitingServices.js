import api from '../api/api';

async function showUsersWaiting(){
    try {
        const response=await api.get('/userswaiting')
        const data=response.data
        return data
    } catch (error) {
        return error.response.data
    }
}

async function getUserWaitingById(id){
    try {
        const response=await api.get(`/userswaiting/${id}`)
        const data=response.data
        return data
    } catch (error) {
        return error.response.data
    }
}

async function deleteUserWaiting(id){
    try {
        const response=await api.delete(`/userswaiting/${id}`)
        const data=response.data
        return data
    } catch (error) {
        return error.response.data
    }
}

async function filterUsersWaiting(userWaiting){
    try {
        const response=await api.post('/userswaiting/filterUsersWaiting/filter',userWaiting)
        const data=response.data
        return data
    } catch (error) {
        return error.response.data
    }
}

const usersServices={
    showUsersWaiting,
    getUserWaitingById,
    deleteUserWaiting,
    filterUsersWaiting
}

export default usersServices