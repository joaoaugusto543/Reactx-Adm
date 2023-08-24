require('dotenv').config({
    path: process.env.NODE_ENV.trim() === 'test' ?  '.env.testing' : '.env'
})
const app = require('../../app')
const request=require('supertest')
const { encryptPassword } = require('../../services/cryptography')
const { faker } = require('@faker-js/faker')
const { insert, deleteLine } = require('../../config/db')
let token=''

describe('usersAdmValidation',()=>{

    async function createUserAdm(id,email,rg,cpf,phone){
    
        const tableUsersAdm='usersadm'
    
        const newUserAdm={
            id,
            password:await encryptPassword('123456'),
            name: faker.person.fullName(),
            email,
            cpf,
            rg,
            phone,
            birthday:faker.date.birthdate(),
            gender:'Masculino',
            state: 'PR',
            city: 'Pinhais',
            mainadmin:true
        }
    
        await insert(tableUsersAdm,newUserAdm)
    
        return {newUserAdm}
    }

    async function login(userAdm){
        
        const res=await request(app).post('/api/session/').send(userAdm)

        token=`Bearer ${res.body.token}`

        return token
    }

    async function deleteUserAdm(id){

        await deleteLine('usersadm',`id = '${id}'`)

    }

    it('User adm invalid',async ()=>{

        const {newUserAdm}=await createUserAdm('334426432','ddssdfhgdsd@gmail.com','12.911.626-5','704.372.426-09','(83) 2343-4497')

        const token=await login({cpf:newUserAdm.cpf,password:'123456'})
     
        const res=await request(app).post('/api/usersadm/').set('Authorization',token).send({})

        const body=res.body

        expect(body).toHaveProperty('errors')

        await deleteUserAdm(newUserAdm.id)
      
    })

    it('Code invalid',async ()=>{

        const {newUserAdm}=await createUserAdm('364122332','dsdasjksnhgdsd@gmail.com','19.703.168-5','643.648.854-52','(33) 2261-3186')

        const token=await login({cpf:newUserAdm.cpf,password:'123456'})

        const userAdm={
            name:'l'
        }
     
        const res=await request(app).put('/api/usersadm/update').set('Authorization',token).send(userAdm)

        const body=res.body

        expect(body).toHaveProperty('errors')

        await deleteUserAdm(newUserAdm.id)
      
    })


})