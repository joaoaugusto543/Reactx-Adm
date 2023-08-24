require('dotenv').config({
    path: process.env.NODE_ENV.trim() === 'test' ?  '.env.testing' : '.env'
})
const request=require('supertest')
const app=require('../../app')
const baseUrl='/api/creditApplications'
const { insert, deleteLine, select } = require('../../config/db')
const { v4: uuidv4 } = require('uuid')
const {faker}=require('@faker-js/faker')
const { encryptPassword } = require('../../services/cryptography')
let token=''

describe('CreditRoutes',()=>{

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

    async function createAccount(){
        
        const tableAccounts='accounts'

        const account={
            id:'1',
            code: uuidv4(),
            extrato:[],
            credit:0,
            money:0
        }

        await insert(tableAccounts,account)

        return {account,tableAccounts}
    }


    async function createCredit(){
        
        const tableCreditapplications='creditapplications'

        const newCredit={
            id: '1',
            password:faker.internet.password(),
            name: faker.person.fullName(),
            email:faker.internet.email(),
            cpf:'553.100.616-06',
            rg:'43.598.734-3',
            phone:'(69) 2675-3484',
            birthday:faker.date.birthdate(),
            gender:'Masculino',
            state: 'PR',
            city: 'Pinhais',
            idaccount:'1',
            value:100
        }

        await insert(tableCreditapplications,newCredit)

        return {newCredit,tableCreditapplications}
    }

    it('Get credits',async ()=>{

        const {newUserAdm}=await createUserAdm('3764343','ewfryhqugey@gmail.com','39.238.478-0','172.189.510-82','(79) 2669-6618')

        const token=await login({cpf:newUserAdm.cpf,password:'123456'})

        //create account

        const {account,tableAccounts}=await createAccount()

        //create credit

        const {newCredit,tableCreditapplications}=await createCredit()

        //getting reply
        
        const res=await request(app).get(`${baseUrl}/`).set('Authorization',token)
        
        const credit=res.body[0]
        
        //condition
        
        const conditionIdCredit=`id = '${newCredit.id}'`
        
        const conditionIdAccount=`id = '${account.id}'`

        //delete

        await deleteLine(tableCreditapplications,conditionIdCredit)

        await deleteLine(tableAccounts,conditionIdAccount)

        await deleteUserAdm(newUserAdm.id)

        //test

        expect(credit).toHaveProperty('id')
        expect(credit).toHaveProperty('name')

    })

    it('Get credit by id',async ()=>{

        const {newUserAdm}=await createUserAdm('373264343','ewfrysdadshqugey@gmail.com','49.123.457-1','268.206.157-52','(48) 2582-1523')

        const token=await login({cpf:newUserAdm.cpf,password:'123456'})

        //create account

        const {account,tableAccounts}=await createAccount()

        //create credit

        const {newCredit,tableCreditapplications}=await createCredit()

        //getting reply
        
        const res=await request(app).get(`${baseUrl}/${newCredit.id}`).set('Authorization',token)
        
        const credit=res.body
        
        //condition
        
        const conditionIdCredit=`id = '${newCredit.id}'`
        
        const conditionIdAccount=`id = '${account.id}'`

        //delete

        await deleteLine(tableCreditapplications,conditionIdCredit)

        await deleteLine(tableAccounts,conditionIdAccount)

        await deleteUserAdm(newUserAdm.id)

        //test


        expect(credit).toHaveProperty('birthday')
        expect(credit).toHaveProperty('city')
        expect(credit).toHaveProperty('cpf')
        expect(credit).toHaveProperty('cpf')
        expect(credit).toHaveProperty('email')
        expect(credit).toHaveProperty('gender')
        expect(credit).toHaveProperty('idaccount')
        expect(credit).toHaveProperty('phone')
        expect(credit).toHaveProperty('rg')
        expect(credit).toHaveProperty('state')
        expect(credit).toHaveProperty('value')

    })

    it('Accept credit',async ()=>{

        const {newUserAdm}=await createUserAdm('373264331243','ewfrysdfeadshqugey@gmail.com','32443','678.235.408-00','(48) 25845-1523')

        const token=await login({cpf:newUserAdm.cpf,password:'123456'})

        //create account

        const {account,tableAccounts}=await createAccount()

        //create credit

        const {newCredit,tableCreditapplications}=await createCredit()

        //condition
        
        const conditionIdAccount=`id = '${account.id}'`

        const conditionIdCredit=`id = '${newCredit.id}'`

        //getting reply
   
        await request(app).post(`${baseUrl}/accept/${newCredit.id}`).set('Authorization',token)

        await deleteUserAdm(newUserAdm.id)

        const oldCreditAmount=account.credit

        const accountCredit=(await select(tableAccounts,['credit'],conditionIdAccount))[0]

        const newCreditAmount=accountCredit.credit
        

        //delete

        await deleteLine(tableCreditapplications,conditionIdCredit)
        
        await deleteLine(tableAccounts,conditionIdAccount)

        //test

        expect(oldCreditAmount).not.toBe(newCreditAmount)
        expect(newCreditAmount).toBe(oldCreditAmount + newCredit.value)
     
    })

    it('To deny credit',async ()=>{

        const {newUserAdm}=await createUserAdm('373264324343','ewfrysdaddsshqugey@gmail.com','49.123.-1','327.373.589-90','(45) 2582-1523')

        const token=await login({cpf:newUserAdm.cpf,password:'123456'})

        //create account

        const {account,tableAccounts}=await createAccount()

        //create credit

        const {newCredit,tableCreditapplications}=await createCredit()

        //condition
        
        const conditionIdAccount=`id = '${account.id}'`
        const conditionIdCredit=`id = '${newCredit.id}'`

        //getting reply
   
        await request(app).delete(`${baseUrl}/todeny/${newCredit.id}`).set('Authorization',token)

        const oldCreditAmount=account.credit

        const accountCredit=(await select(tableAccounts,['credit'],conditionIdAccount))[0]

        const newCreditAmount=accountCredit.credit
        

        //delete

        await deleteLine(tableCreditapplications,conditionIdCredit)

        await deleteLine(tableAccounts,conditionIdAccount)

        await deleteUserAdm(newUserAdm.id)

        //test

        expect(oldCreditAmount).toBe(newCreditAmount)
     
    })

    it('Filter credit applications',async ()=>{

        const {newUserAdm}=await createUserAdm('37323264343','ewfrysdadfdshqugey@gmail.com','457-1','478.423.148-02','(42-1523')

        const token=await login({cpf:newUserAdm.cpf,password:'123456'})

        //create account

        const {account,tableAccounts}=await createAccount()

        //create credit

        const {newCredit,tableCreditapplications}=await createCredit()

        //condition
        
        const conditionIdAccount=`id = '${account.id}'`

        const conditionIdCredit=`id = '${newCredit.id}'`

        //getting reply
   
        const res=await request(app).post(`${baseUrl}/filtercreditapplications/filter`).send({cpf:newCredit.cpf}).set('Authorization',token)

        const credit=res.body[0]

        //delete

        await deleteLine(tableCreditapplications,conditionIdCredit)

        await deleteLine(tableAccounts,conditionIdAccount)

        await deleteUserAdm(newUserAdm.id)

        //test

        expect(credit.id).toBe(newCredit.id)
     
    })

    it('Error account does not exist get credit by id',async ()=>{

        const {newUserAdm}=await createUserAdm('37323464343','ewfrysdadshquewgey@gmail.com','49.32443245','469.710.481-13','(48) 2534242-1523')

        const token=await login({cpf:newUserAdm.cpf,password:'123456'})

        const res=await request(app).get(`${baseUrl}/143`).set('Authorization',token)

        const body=res.body

        await deleteUserAdm(newUserAdm.id)

        expect(body).toHaveProperty('error')
        expect(body.error).toBe('User does not exist')
    })

    it('Error user does not exist accept credit',async ()=>{

        const {newUserAdm}=await createUserAdm('373264233343','ewfrysdaddsshqugey@gmail.com','42723','836.776.485-48','(484356523')

        const token=await login({cpf:newUserAdm.cpf,password:'123456'})
   
        const res= await request(app).post(`${baseUrl}/accept/346`).set('Authorization',token)

        const body=res.body

        await deleteUserAdm(newUserAdm.id)

        expect(body).toHaveProperty('error')
        expect(body.error).toBe('User does not exist')
     
    })

    it('Error user does not exist to deny credit',async ()=>{

        const {newUserAdm}=await createUserAdm('37326434ewdsf3','ewfrydsffdsdadshqugey@gmail.com','324632324.457-1','184.678.642-81','(48) 2324637-1523')

        const token=await login({cpf:newUserAdm.cpf,password:'123456'})

        const res=await request(app).delete(`${baseUrl}/todeny/241`).set('Authorization',token)

        const body=res.body

        await deleteUserAdm(newUserAdm.id)

        expect(body).toHaveProperty('error')
        expect(body.error).toBe('User does not exist')

    })

})