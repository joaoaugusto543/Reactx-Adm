import axios from 'axios'

const api=axios.create({
    baseURL:'http://localhost:4000/api' 
})

const token=localStorage.getItem('token')

if(token){
    api.defaults.headers.authorization=`Bearer ${token}`
}

export default api