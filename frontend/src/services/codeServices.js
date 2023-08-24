import api from '../api/api'

async function sendVerificationCode(auth){
    try {
        const response=await api.post('/usersadm/sendVerificationCode',auth)
        const data=response.data
        return data

    } catch (error) {
        return error.response.data
    }
}

const codeServices={
    sendVerificationCode
}

export default codeServices