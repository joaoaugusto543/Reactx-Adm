require('dotenv').config({
    path: process.env.NODE_ENV.trim() === 'test' ?  '.env.testing' : '.env'
})
const request=require('supertest')
const app=require('../../app')
const { insert, deleteLine, select } = require('../../config/db')
const baseUrl='/api/usersBanned'
const generateAccountCode = require('../../services/generateAccountCode')
const { faker } = require('@faker-js/faker')
const { encryptPassword } = require('../../services/cryptography')

describe('usersBannedRoutes',()=>{

    async function createUser(){

        const tableUsers='users'

        const account={
            id:'1343',
            code: await generateAccountCode(),
            extrato:[],
            credit:0,
            money:0
        }

        await insert('accounts',account)

        const newUser={
            id:'1334',
            password:await encryptPassword('123456'),
            name: faker.person.fullName(),
            email:faker.internet.email(),
            cpf:'725.605.540-46',
            rg:'15.842.886-2',
            phone:'(53) 2146-3683',
            birthday:faker.date.birthdate(),
            gender:'Masculino',
            state: 'PR',
            city: 'Pinhais',
            idaccount:account.id
        }

        await insert(tableUsers,newUser)

        return {newUser,tableUsers}
    }

    async function createUserBanned(){

        const tableUsersBanned='usersbanned'

        const account={
            id:'1343',
            code: await generateAccountCode(),
            extrato:[],
            credit:0,
            money:0
        }

        await insert('accounts',account)

        const newUserBanned={
            id:'1334',
            password:await encryptPassword('123456'),
            name: faker.person.fullName(),
            email:faker.internet.email(),
            cpf:'725.605.540-46',
            rg:'15.842.886-2',
            phone:'(53) 2146-3683',
            birthday:faker.date.birthdate(),
            gender:'Masculino',
            state: 'PR',
            city: 'Pinhais',
            idaccount:account.id
        }

        await insert(tableUsersBanned,newUserBanned)

        return {newUserBanned,tableUsersBanned}
    }

    async function deleteUser(){

       await deleteLine('users',`id = '1334'`)
       await deleteLine('accounts',`id = '1343'`)

    }

    async function deleteUserBanned(){

        await deleteLine('usersbanned',`id = '1334'`)
        await deleteLine('accounts',`id = '1343'`)
 
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

    it('Banned user and unBan user',async ()=>{

        const {newUserAdm}=await createUserAdm('36435432','dhgdfdfsdsd@gmail.com','342234214','072.149.653-99','234237')

        const token=await login({cpf:newUserAdm.cpf,password:'123456'})

        const {newUser,tableUsers}=await createUser()

        const conditionId=`id = '${newUser.id}'`

        //banned

        const userBeforeBan=(await select(tableUsers,['cpf'],conditionId))[0]

        await request(app).post(`${baseUrl}/1334`).set('Authorization',token)

        const userAfterBan=(await select(tableUsers,['cpf'],conditionId))[0]

        expect(userBeforeBan.cpf).toBe(newUser.cpf)

        expect(userAfterBan).toBeUndefined()

        //unBan

        const userBeforeUnban=userAfterBan

        await request(app).post(`${baseUrl}/unban/1334`).set('Authorization',token)

        const userAfterUnban=(await select(tableUsers,['cpf'],conditionId))[0]

        deleteUserAdm(newUserAdm.id)

        expect(userBeforeUnban).toBeUndefined()
        expect(userAfterUnban.cpf).toBe(newUser.cpf)

        deleteUser()
        
    })

    it('Error user does not exist ban user',async ()=>{

        const {newUserAdm}=await createUserAdm('364234568435432','tpwdqjdequwdsd@gmail.com','23457698','175.172.134-58','23423437')

        const token=await login({cpf:newUserAdm.cpf,password:'123456'})

        const res=await request(app).post(`${baseUrl}/214`).set('Authorization',token)

        const body=res.body

        deleteUserAdm(newUserAdm.id)

        expect(body).toHaveProperty('error')
        expect(body.error).toBe('User does not exist')
    })

    it('Error user does not exist unban user',async ()=>{

        const {newUserAdm}=await createUserAdm('9275347','tewrywed@gmail.com','9345754','262.250.362-88','345432765')

        const token=await login({cpf:newUserAdm.cpf,password:'123456'})

        const res=await request(app).post(`${baseUrl}/unban/2332`).set('Authorization',token)

        const body=res.body

        deleteUserAdm(newUserAdm.id)

        expect(body).toHaveProperty('error')
        expect(body.error).toBe('User does not exist')
    })

    it('Get by id user banned',async ()=>{

        const {newUserAdm}=await createUserAdm('7235432','lsdabyw@gmail.com','86322453','250.444.867-87','823642365')

        const token=await login({cpf:newUserAdm.cpf,password:'123456'})

        const {newUserBanned}=await createUserBanned()

        const res=await request(app).get(`${baseUrl}/${newUserBanned.id}`).set('Authorization',token)

        deleteUserAdm(newUserAdm.id)

        const userBanned=res.body

        await deleteUserBanned()

        expect(userBanned.cpf).toBe(newUserBanned.cpf)
    })

    it('Error user does not exist get by id user banned',async ()=>{

        const {newUserAdm}=await createUserAdm('23914124','peruewhfew@gmail.com','12321442132','129.794.058-09','0843643')

        const token=await login({cpf:newUserAdm.cpf,password:'123456'})

        const res=await request(app).get(`${baseUrl}/32443`).set('Authorization',token)

        const body=res.body

        deleteUserAdm(newUserAdm.id)

        expect(body).toHaveProperty('error')
        expect(body.error).toBe('User does not exist')

    })

    it('Get users banned',async ()=>{

        const {newUserAdm}=await createUserAdm('083623784843','kjdwbuyed@gmail.com','632532','227.866.347-09','2463427432')

        const token=await login({cpf:newUserAdm.cpf,password:'123456'})

        const res=await request(app).get(`${baseUrl}/`).set('Authorization',token)

        const usersBanned=res.body

        deleteUserAdm(newUserAdm.id)

        expect(Array.isArray(usersBanned)).toBeTruthy()

    })

    it('Filter users banned',async ()=>{

        const {newUserAdm}=await createUserAdm('21653712312','mhedbvyeq@gmail.com','921742389','158.357.784-06','5467523753')

        const token=await login({cpf:newUserAdm.cpf,password:'123456'})
    
        const {newUserBanned}=await createUserBanned()

        //getting reply
        
        const res=await request(app).post(`${baseUrl}/filter/usersbanned`).send({cpf:newUserBanned.cpf}).set('Authorization',token)

        deleteUserAdm(newUserAdm.id)
        
        const userBanned=res.body[0]
        
        //delete
 
        await deleteUserBanned()

        //test

        expect(userBanned.id).toBe(newUserBanned.id)
     
    })


})