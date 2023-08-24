require('dotenv').config({
    path: process.env.NODE_ENV.trim() === 'test' ?  '.env.testing' : '.env'
})

const app = require('../../app')
const request=require('supertest')
const { encryptPassword } = require('../../services/cryptography')
const { faker } = require('@faker-js/faker')
const { insert, deleteLine } = require('../../config/db')

describe('CheckTheVerificationCode',()=>{

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

    it('Code was not provided',async ()=>{

        const {newUserAdm}=await createUserAdm('3274866257334','ewdsffds@gmail.com','43.244.664-9','361.005.148-50','(86) 2432-1542')

        const token=await login({cpf:newUserAdm.cpf,password:'123456'})
     
        const res=await request(app).put('/api/usersadm/update').set('Authorization',token).send({newPassword:'123'})

        const body=res.body

        expect(body).toHaveProperty('error')
        expect(body.error).toBe('Code was not provided')

        await deleteUserAdm(newUserAdm.id)
      
    })

    it('Code invalid',async ()=>{

        const {newUserAdm}=await createUserAdm('32344236432','dhgdfsdsdsd@gmail.com','23.636.217-4','975.247.386-50','(97) 2625-5648')

        const token=await login({cpf:newUserAdm.cpf,password:'123456'})
     
        const res=await request(app).put('/api/usersadm/update').set('Authorization',token).send({newPassword:'123',encryptedCode:'73',code:'23638'})

        const body=res.body

        expect(body).toHaveProperty('error')
        expect(body.error).toBe('Invalid code')

        await deleteUserAdm(newUserAdm.id)
      
    })


})