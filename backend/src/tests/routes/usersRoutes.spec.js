require('dotenv').config({
    path: process.env.NODE_ENV.trim() === 'test' ?  '.env.testing' : '.env'
})
const request=require('supertest')
const app=require('../../app')
const { insert, deleteLine, select } = require('../../config/db')
const baseUrl='/api/users'
const generateAccountCode = require('../../services/generateAccountCode')
const { faker } = require('@faker-js/faker')
const { encryptPassword } = require('../../services/cryptography')
let token=''

describe('usersRoutes',()=>{

    async function createUserWaiting(){

        const tableUsersWaiting='userswaiting'

        const newUserWaiting={
            id:'65342',
            password:await encryptPassword('123456'),
            name: faker.person.fullName(),
            email:faker.internet.email(),
            cpf:'335.279.111-20',
            rg:'42.487.898-7',
            phone:'(89) 2191-8504',
            birthday:faker.date.birthdate(),
            gender:'Masculino',
            state: 'PR',
            city: 'Pinhais',
        }

        await insert(tableUsersWaiting,newUserWaiting)

        return {newUserWaiting}
    }

    async function createUser(){

        const tableUsers='users'

        const account={
            id:'3246',
            code: await generateAccountCode(),
            extrato:[],
            credit:0,
            money:0
        }

        await insert('accounts',account)

        const newUser={
            id:'65342',
            password:await encryptPassword('123456'),
            name: faker.person.fullName(),
            email:faker.internet.email(),
            cpf:'335.279.111-20',
            rg:'42.487.898-7',
            phone:'(89) 2191-8504',
            birthday:faker.date.birthdate(),
            gender:'Masculino',
            state: 'PR',
            city: 'Pinhais',
            idaccount:account.id
        }

        await insert(tableUsers,newUser)

        return {newUser,tableUsers}
    }

    async function deleteUser(){

       await deleteLine('users',`id = '65342'`)
       await deleteLine('accounts',`id = '3246'`)

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

    it('Create user',async ()=>{

        const {newUserAdm}=await createUserAdm('09234793','vjhdsbsu@gmail.com','2394748','214.649.167-13','427821')

        const token=await login({cpf:newUserAdm.cpf,password:'123456'})

        const tableUsers='users'

        const {newUserWaiting}=await createUserWaiting()

        await request(app).post(`${baseUrl}/${newUserWaiting.id}`).set('Authorization',token)

        deleteUserAdm(newUserAdm.id)

        const conditionCpf=`cpf = '${newUserWaiting.cpf}'`
        
        const user=(await select(tableUsers,['cpf','id','idaccount'],conditionCpf))[0]
        
        const conditionId=`id = '${user.id}'`
        const conditionIdAccount=`id = '${user.idaccount}'`

        await deleteLine(tableUsers,conditionId)
        await deleteLine('accounts',conditionIdAccount)

        expect(user.cpf).toBe(newUserWaiting.cpf)
   
    })

    it('Error user does not exist create user',async ()=>{

        const {newUserAdm}=await createUserAdm('972142623','dnheiqbfuh@gmail.com','482356842','765.361.558-90','32535232')

        const token=await login({cpf:newUserAdm.cpf,password:'123456'})

        const res=await request(app).post(`${baseUrl}/2332`).set('Authorization',token)

        deleteUserAdm(newUserAdm.id)

        const body=res.body

        expect(body).toHaveProperty('error')
        expect(body.error).toBe('User does not exist')
    })

    it('Get by id user',async ()=>{

        const {newUserAdm}=await createUserAdm('238453443','hbsdhjvshu@gmail.com','543267432','323.876.554-00','74624343')

        const token=await login({cpf:newUserAdm.cpf,password:'123456'})

        const {newUser}=await createUser()

        const res=await request(app).get(`${baseUrl}/${newUser.id}`).set('Authorization',token)

        deleteUserAdm(newUserAdm.id)

        const user=res.body

        await deleteUser()

        expect(user.cpf).toBe(newUser.cpf)
    })

    it('Error user does not exist get by id user',async ()=>{

        const {newUserAdm}=await createUserAdm('238765836','hadjhbsaghvsdyg@gmail.com','48732844153426','584.361.599-50','3259856723465')

        const token=await login({cpf:newUserAdm.cpf,password:'123456'})

        const res=await request(app).get(`${baseUrl}/32213`).set('Authorization',token)

        deleteUserAdm(newUserAdm.id)

        const body=res.body

        expect(body).toHaveProperty('error')
        expect(body.error).toBe('User does not exist')

    })

    it('Get users',async ()=>{

        const {newUserAdm}=await createUserAdm('03148327432','lsabhsagftasw@gmail.com','32874325','076.337.022-30','342734276432')

        const token=await login({cpf:newUserAdm.cpf,password:'123456'})

        const res=await request(app).get(`${baseUrl}/`).set('Authorization',token)

        deleteUserAdm(newUserAdm.id)

        const users=res.body

        expect(Array.isArray(users)).toBeTruthy()

    })

    it('Filter users',async ()=>{

        const {newUserAdm}=await createUserAdm('943784235','wbhbfhds@gmail.com','23632432','149.656.480-48','3874647832')

        const token=await login({cpf:newUserAdm.cpf,password:'123456'})
    
        const {newUser}=await createUser()

        //getting reply
        
        const res=await request(app).post(`${baseUrl}/filter/users`).send({cpf:newUser.cpf}).set('Authorization',token)

        deleteUserAdm(newUserAdm.id)
        
        const user=res.body[0]
        
        //delete
 
        await deleteUser()

        //test

        expect(user.id).toBe(newUser.id)
     
    })


})
