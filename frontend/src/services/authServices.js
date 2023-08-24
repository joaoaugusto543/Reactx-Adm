import api from '../api/api'

async function login(cpf,password){
    try {
        const response=await api.post('/session',{cpf,password})
        const data=response.data

        api.defaults.headers.authorization=`Bearer ${data.token}`

        return data
        
    } catch (error) {
        return error.response.data
    }
}

const authServices={
    login
}

export default authServices