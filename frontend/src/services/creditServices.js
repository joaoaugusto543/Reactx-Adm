import api from '../api/api';

async function showCreditApplications(){
    try {
        const response=await api.get('/creditApplications')
        const data=response.data
        return data

    } catch (error) {
        return error.response.data
    }
}

async function acceptCreditRequest(id){
    try {
        const response=await api.post(`/creditApplications/accept/${id}`)
        const data=response.data
        return data

    } catch (error) {
        return error.response.data
    }
}

async function denyCreditRequest(id){
    try {
        const response=await api.delete(`/creditApplications/todeny/${id}`)
        const data=response.data
        return data

    } catch (error) {
        return error.response.data
    }
}

async function getCreditRequestById(id){
    try {
        const response=await api.get(`/creditApplications/${id}`)
        const data=response.data
        return data

    } catch (error) {
        return error.response.data
    }
}

async function filterCreditapplications(creditApplications){
    try {
        const response=await api.post('/creditApplications/filtercreditapplications/filter',creditApplications)
        const data=response.data
        return data

    } catch (error) {
        return error.response.data
    }
}


const creditServices={
    showCreditApplications,
    acceptCreditRequest,
    denyCreditRequest,
    getCreditRequestById,
    filterCreditapplications
}

export default creditServices