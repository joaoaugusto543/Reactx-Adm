const { faker } = require('@faker-js/faker')
const { insert, deleteLine } = require('../../config/db')
const app = require('../../app')
const request=require('supertest')
const { encryptPassword } = require('../../services/cryptography')

async function createUserAdm(){
    
    const tableUsersAdm='usersadm'

    const newUserAdm={
        id: '1',
        password:await encryptPassword('123456'),
        name: faker.person.fullName(),
        email:'sbvsssda@gmail.com',
        cpf:'553.100.616-06',
        rg:'43.598.734-3',
        phone:'(69) 2675-3484',
        birthday:faker.date.birthdate(),
        gender:'Masculino',
        state: 'PR',
        city: 'Pinhais',
        mainadmin:false
    }

    await insert(tableUsersAdm,newUserAdm)

    return {newUserAdm,tableUsersAdm}
}


describe('SessionsRoutes',()=>{

    it('Create session',async ()=>{

        const {newUserAdm,tableUsersAdm}=await createUserAdm()
       
        const res=await request(app).post('/api/session/').send({cpf:newUserAdm.cpf,password:'123456'})

        const conditionId=`id = '${newUserAdm.id}'`

        deleteLine(tableUsersAdm,conditionId)

        const body=res.body

        expect(body).toHaveProperty('userAdm')
        expect(body).toHaveProperty('token')
        expect(body.userAdm).toHaveProperty('email')
        expect(body.userAdm).toHaveProperty('id')        
        expect(body.userAdm).toHaveProperty('name')
        expect(body.userAdm).toHaveProperty('mainadmin')
      
    })

    it('Error user / password invalid create session',async ()=>{
       
        const res=await request(app).post('/api/session/').send({cpf:'123',password:'123456'})

        const body=res.body

        expect(body).toHaveProperty('authenticationError')
        expect(body.authenticationError).toBe('user / password invalid')
      
    })
})