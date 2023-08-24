require('dotenv').config({
    path: process.env.NODE_ENV.trim() === 'test' ?  '.env.testing' : '.env'
})
const request=require('supertest')
const app=require('../../app')
const { insert, deleteLine } = require('../../config/db')
const generateAccountCode = require('../../services/generateAccountCode')
const { encryptPassword } = require('../../services/cryptography')
const { faker } = require('@faker-js/faker')
const baseUrl='/api/accounts'

describe('AccountRoutes',()=>{

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

    it('Get account by id',async ()=>{

        const {newUserAdm}=await createUserAdm('36432','dhgdsd@gmail.com','18.708.025-4','585.451.618-75','(49) 3287-2177')

        const token=await login({cpf:newUserAdm.cpf,password:'123456'})

        const account={
            id:'143',
            code: await generateAccountCode(),
            extrato:[],
            credit:0,
            money:0
        }

        await insert('accounts',account)

        const res=await request(app).get(`${baseUrl}/${account.id}`).set('Authorization',token)

        const body=res.body

        const conditionId=`id = '${account.id}'`

        deleteLine('accounts',conditionId)

        expect(body).toHaveProperty('code')
        expect(body).toHaveProperty('credit')
        expect(body).toHaveProperty('money')
        expect(body).toHaveProperty('credit')
        expect(body).toHaveProperty('extrato')

        await deleteUserAdm(newUserAdm.id)
    })

    it('Error account does not exist get account by id',async ()=>{

        const {newUserAdm}=await createUserAdm('438243','dasdas@gmail.com','22.542.528-9','734.186.531-89','(66) 2481-4447')

        const token=await login({cpf:newUserAdm.cpf,password:'123456'})

        const res=await request(app).get(`${baseUrl}/437`).set('Authorization',token)

        const body=res.body

        expect(body).toHaveProperty('error')
        expect(body.error).toBe('Account does not exist')

        await deleteUserAdm(newUserAdm.id)
    })

})
