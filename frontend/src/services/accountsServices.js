import api from '../api/api'

async function getAccountById(id){
    try {
        const response=await api.get(`/accounts/${id}`)
        const data=response.data
        return data
    } catch (error) {
        return error.response.data
    }
} 

const accountsServices={
    getAccountById
}

export default accountsServices