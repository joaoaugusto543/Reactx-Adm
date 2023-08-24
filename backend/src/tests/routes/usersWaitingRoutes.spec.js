require('dotenv').config({
    path: process.env.NODE_ENV.trim() === 'test' ?  '.env.testing' : '.env'
})
const request=require('supertest')
const app=require('../../app')
const { insert, deleteLine, select } = require('../../config/db')
const baseUrl='/api/userswaiting'
const { faker } = require('@faker-js/faker')
const { encryptPassword } = require('../../services/cryptography')
let token=''

describe('usersWaitingRoutes',()=>{

    async function createUserWaiting(){

        const tableUsersWaiting='userswaiting'

        const newUserWaiting={
            id:'32476243',
            password:await encryptPassword('123456'),
            name: faker.person.fullName(),
            email:faker.internet.email(),
            cpf:'639.442.666-09',
            rg:'37.758.817-3',
            phone:'(87) 3178-7242',
            birthday:faker.date.birthdate(),
            gender:'Masculino',
            state: 'PR',
            city: 'Pinhais',
        }

        await insert(tableUsersWaiting,newUserWaiting)

        return {newUserWaiting,tableUsersWaiting}
    }

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

    it('Get by id user waiting',async ()=>{

        const {newUserAdm}=await createUserAdm('234687234634','dsfljsgduigwr@gmail.com','396342','960.862.132-16','4576543242')

        const token=await login({cpf:newUserAdm.cpf,password:'123456'})

        const {newUserWaiting,tableUsersWaiting}=await createUserWaiting()

        const res=await request(app).get(`${baseUrl}/${newUserWaiting.id}`).set('Authorization',token)

        deleteUserAdm(newUserAdm.id)

        const UserWaiting=res.body

        const conditionId=`id = '${newUserWaiting.id}'`

        await deleteLine(tableUsersWaiting,conditionId)

        expect(UserWaiting.cpf).toBe(newUserWaiting.cpf)
    })

    it('Error user does not exist get by id user waiting',async ()=>{

        const {newUserAdm}=await createUserAdm('3422535234','diebefwf@gmail.com','275852345','715.309.805-42','9243871341')

        const token=await login({cpf:newUserAdm.cpf,password:'123456'})

        const res=await request(app).get(`${baseUrl}/32613`).set('Authorization',token)

        deleteUserAdm(newUserAdm.id)

        const body=res.body

        expect(body).toHaveProperty('error')
        expect(body.error).toBe('User does not exist')

    })

    it('Get users waiting',async ()=>{

        const {newUserAdm}=await createUserAdm('324543262','ldshasuhduyv@gmail.com','2345217194','263.780.135-27','03248642367')

        const token=await login({cpf:newUserAdm.cpf,password:'123456'})

        const res=await request(app).get(`${baseUrl}/`).set('Authorization',token)

        deleteUserAdm(newUserAdm.id)

        const users=res.body

        expect(Array.isArray(users)).toBeTruthy()

    })

    it('Filter users waiting',async ()=>{

        const {newUserAdm}=await createUserAdm('32847347','lsdkahijsadgsad@gmail.com','1546365312','502.808.973-67','154252344234')

        const token=await login({cpf:newUserAdm.cpf,password:'123456'})
    
        const {newUserWaiting,tableUsersWaiting}=await createUserWaiting()

        //getting reply
        
        const res=await request(app).post(`${baseUrl}/filterUsersWaiting/filter`).send({cpf:newUserWaiting.cpf}).set('Authorization',token)

        deleteUserAdm(newUserAdm.id)
        
        const user=res.body[0]
        
        //delete
 
        const conditionId=`id = '${newUserWaiting.id}'`

        await deleteLine(tableUsersWaiting,conditionId)

        //test

        expect(user.id).toBe(newUserWaiting.id)
     
    })


})