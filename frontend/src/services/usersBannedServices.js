import api from '../api/api';

async function createUserBanned(id){
    try {
        const response=await api.post(`/usersBanned/${id}`)
        const data=response.data
        return data
    } catch (error) {
        return error.response.data
    }
}

async function showUsersBanned(){
    try {
        const response=await api.get('/usersBanned')
        const data=response.data
        return data
    } catch (error) {
        return error.response.data
    }
}

async function getUserBannedById(id){
    try {
        const response=await api.get(`/usersBanned/${id}`)
        const data=response.data
        return data
    } catch (error) {
        return error.response.data
    }
}

async function unBanUserBanned(id){
    try {
        const response=await api.post(`/usersBanned/unban/${id}`)
        const data=response.data
        return data
    } catch (error) {
        return error.response.data
    }
}

async function filterUsersBanned(userBanned){
    try {
        const response=await api.post('/usersBanned/filter/usersbanned',userBanned)
        const data=response.data
        return data
    } catch (error) {
        return error.response.data
    }
}

const usersBannedServices={
    createUserBanned,
    showUsersBanned,
    getUserBannedById,
    unBanUserBanned,
    filterUsersBanned
}

export default usersBannedServices