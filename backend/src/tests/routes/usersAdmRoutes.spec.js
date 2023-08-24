require('dotenv').config({
    path: process.env.NODE_ENV.trim() === 'test' ?  '.env.testing' : '.env'
})
const request=require('supertest')
const app=require('../../app')
const { insert, deleteLine, select } = require('../../config/db')
const baseUrl='/api/usersadm'
const { encryptPassword, encryptCode, verifyPassword } = require('../../services/cryptography')
const { faker, fa } = require('@faker-js/faker')

describe('UserAdmRoutes',()=>{
     
    async function createSession(id,email,rg,cpf,phone,mainadmin){
    
        const {newUserAdm,tableUsersAdm}=await createUserAdm(id,email,rg,cpf,phone,mainadmin)
           
        const res=await request(app).post('/api/session/').send({cpf:newUserAdm.cpf,password:'123456'})
    
        const newToken=`Bearer ${res.body.token}`
    
        return {newToken,tableUsersAdm,newUserAdm}
    }

    async function createUserAdm(id,email,rg,cpf,phone,mainadmin){
    
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
            mainadmin
        }
    
        await insert(tableUsersAdm,newUserAdm)
    
        return {newUserAdm,tableUsersAdm}
    }

    async function deleteUserAdm(id){
        await deleteLine('usersadm',`id = '${id}'`)
    }

    it('Create user adm',async ()=>{

        const {newToken:token,newUserAdm:userAdmLogin}=await createSession('36324432432','dhsdaasdsdagdsd@gmail.com','35.227.389-0','868.642.283-71','(75) 3330-4076',true)

        const newUserAdm={
            password:'123456',
            confirmPassword:'123456',
            name: faker.person.fullName(),
            email:faker.internet.email(),
            cpf:'143.769.364-48',
            rg:'18.726.218-4',
            phone:'(83) 3237-8418',
            birthday:'01/01/2005',
            gender:'Masculino',
            state: 'PR',
            city: 'Pinhais'
        }

        const res=await request(app).post(`${baseUrl}/`).set('Authorization',token).send(newUserAdm)

        const body=res.body

        const table='usersadm'

        const conditionCpf=`cpf = '${newUserAdm.cpf}'`

        const userAdm=(await select(table,'*',conditionCpf))[0]

        await deleteUserAdm(userAdmLogin.id)
        await deleteUserAdm(userAdm.id)

        expect(body).toHaveProperty('id')
        expect(body).toHaveProperty('name')
        expect(body).toHaveProperty('email')
        expect(body).toHaveProperty('cpf')        
        expect(body).toHaveProperty('rg')
        expect(body).toHaveProperty('mainadmin')
        expect(body).toHaveProperty('birthday')
        expect(body).toHaveProperty('gender')
        expect(body).toHaveProperty('city')
        expect(body).toHaveProperty('state')
        expect(userAdm).not.toBe(undefined)

    })

    it('Error User already exists create user adm',async ()=>{

        const {newToken:token,newUserAdm}=await createSession('3632442323432432','dhsdaasdsddsfasagdsd@gmail.com','22.440.780-9','511.516.473-65','(64) 2952-6243',true)

        const newUserAdmCopy={
            ...newUserAdm,
            password:'123456',
            confirmPassword:'123456',
            birthday:'01/01/2005'
        }

        const res=await request(app).post(`${baseUrl}/`).set('Authorization',token).send(newUserAdmCopy)

        const body=res.body

        //delete

        await deleteUserAdm(newUserAdm.id)

        expect(body).toHaveProperty('error')
        expect(body.error).toBe('User already exists')

    })

    it('Update user adm',async ()=>{

        //session

        const {newToken,tableUsersAdm,newUserAdm}=await createSession('36324423232433432432','dhsjaksijsddsfasagdsd@gmail.com','15.373.410-8','640.814.251-67','(87) 3810-4184',true)
       
        //update
        
        await request(app).put(`${baseUrl}/update`).set('Authorization',newToken).send({name:'Lopes'})

        //condition
        
        const conditionCpf=`cpf = '${newUserAdm.cpf}'`

        
        //get user updated
        
        const userAdm=(await select(tableUsersAdm,['name'],conditionCpf))[0]

        await deleteUserAdm(newUserAdm.id)

        //test
        
        expect(newUserAdm.name).not.toBe(userAdm.name)
        expect(userAdm.name).toBe('Lopes')

    })

    it('Filter users adm',async ()=>{

        const {newToken:token,newUserAdm,}=await createSession('5324762323432432','dhlkydsddsfasagdsd@gmail.com','14.663.382-1','445.246.401-77','(85) 3431-0152',true)

        //getting reply
        
        const res=await request(app).post(`${baseUrl}/filter`).send({cpf:newUserAdm.cpf}).set('Authorization',token)

        await deleteUserAdm(newUserAdm.id)
        
        const userAdm=res.body[0]
      
        //test

        expect(userAdm.id).toBe(newUserAdm.id)
     
    })

    it('Get user adm by id',async ()=>{

        const {newToken:token,newUserAdm}=await createSession('365472432','dhsdpwoud@gmail.com','15.505.926-9','332.461.151-25','(82) 2604-2462',true)

        const res=await request(app).get(`${baseUrl}/${newUserAdm.id}`).set('Authorization',token)

        await deleteUserAdm(newUserAdm.id)

        const userAdm=res.body

        expect(newUserAdm.cpf).toBe(userAdm.cpf)

    })

    it('Error User does not exist get user adm by id',async ()=>{

        const {newToken:token,newUserAdm}=await createSession('362342432432','dhsddfpwoud@gmail.com','19.787.568-3','667.079.262-09','(64) 2455-1016',true)

        const res=await request(app).get(`${baseUrl}/348`).set('Authorization',token)

        await deleteUserAdm(newUserAdm.id)

        const body=res.body

        expect(body).toHaveProperty('error')
        expect(body.error).toBe('User does not exist')

    })

    it('Get users adm',async ()=>{

        const {newToken:token,newUserAdm}=await createSession('36233232','dhsfgud@gmail.com','38.074.134-8','034.741.409-57','(63) 2194-7712',true)

        const res=await request(app).get(`${baseUrl}/`).set('Authorization',token)

        await deleteUserAdm(newUserAdm.id)

        const body=res.body

        expect(Array.isArray(body)).toBeTruthy()

    })

    it('Profile',async ()=>{

        const {newToken,newUserAdm}=await createSession('364233232','dhsfsadgud@gmail.com','24.096.264-7','587.534.781-34','(61) 2625-5572',true)

        const res=await request(app).get(`${baseUrl}/profile`).set('Authorization',newToken)

        await deleteUserAdm(newUserAdm.id)

        const userAdm=res.body

        expect(newUserAdm.id).toBe(userAdm.id)


    })

    it('ForgottenPassword',async ()=>{

        const {newToken:token,newUserAdm,tableUsersAdm}=await createSession('3623433232','dhsfxzacgud@gmail.com','866.306.182-03','24.827.687-5','(83) 2196-8615',true)

        const forgottenPassword={

            email:newUserAdm.email,
            code:'123456',
            encryptedCode:await encryptCode('123456'),
            forgottenPassword:true

        }

        await request(app).post(`${baseUrl}/forgottenPassword`).set('Authorization',token).send(forgottenPassword)

        
        const conditionId=`id = '${newUserAdm.id}'`
        
        const userAdm=(await select(tableUsersAdm,['password'],conditionId))[0]
        
        await deleteUserAdm(newUserAdm.id)

        expect(userAdm.password).not.toBe(newUserAdm.password)


    })

    it('Error user does not exist forgottenPassword',async ()=>{

        const {newToken:token,newUserAdm}=await createSession('362332234332','dhsfsaadsgud@gmail.com','19.324.452-2','828.509.224-04','(92) 3269-2496',true)

        const forgottenPassword={

            code:'123456',
            encryptedCode:await encryptCode('123456'),
            forgottenPassword:true

        }

        const res=await request(app).post(`${baseUrl}/forgottenPassword`).set('Authorization',token).send(forgottenPassword)

        await deleteUserAdm(newUserAdm.id)

        const body=res.body

        expect(body).toHaveProperty('error')
        expect(body.error).toBe('User does not exist')


    })

    it('Delete user adm',async ()=>{

        const {newToken:token,newUserAdm:userAdmLogin}=await createSession('7856','zgetgwd@gmail.com','23.757.526-1','864.182.859-13','(62) 3376-7838',true)
        const {newUserAdm,tableUsersAdm}=await createUserAdm('75343856','zfgetgwd@gmail.com','27.562.694-3','734.143.052-40','(95) 3855-6328',false)

        await request(app).delete(`${baseUrl}/${newUserAdm.id}`).set('Authorization',token)

        await deleteUserAdm(newUserAdm.id)
        await deleteUserAdm(userAdmLogin.id)

        const conditionId=`id = '${newUserAdm.id}'`

        const userAdm=(await select(tableUsersAdm,['id'],conditionId))[0]

        expect(userAdm).toBeUndefined()


    })

    it('Error Cannot delete your account delete user adm',async ()=>{

        const {newToken,tableUsersAdm,newUserAdm}=await createSession('783456','zgetsdgwd@gmail.com','28.517.167-4','613.321.327-23','(83) 2418-6945',false)

        const res=await request(app).delete(`${baseUrl}/${newUserAdm.id}`).set('Authorization',newToken)

        await deleteUserAdm(newUserAdm.id)

        const conditionId=`id = '${newUserAdm.id}'`

        deleteLine(tableUsersAdm,conditionId)

        const body=res.body

        expect(body).toHaveProperty('error')
        expect(body.error).toBe('Cannot delete your account')

    })

    it('Error Only main admins delete user adm',async ()=>{

        const {newToken,tableUsersAdm,newUserAdm}=await createSession('78343456','zgetdbshsdgwd@gmail.com','48.417.614-6','753.937.185-43','(93) 3274-5986',false)

        const userToBeDeleted={
            id:'37236',
            password:'123456',
            name: faker.person.fullName(),
            email:faker.internet.email(),
            cpf:'143.769.364-48',
            rg:'18.726.218-4',
            phone:'(83) 3237-8418',
            birthday:'01/01/2005',
            gender:'Masculino',
            state: 'PR',
            city: 'Pinhais',
            mainadmin:false
        }

        await insert(tableUsersAdm,userToBeDeleted)

        const res=await request(app).delete(`${baseUrl}/${userToBeDeleted.id}`).set('Authorization',newToken)

        await deleteUserAdm(newUserAdm.id)

        const conditionIdNewUserAdm=`id = '${newUserAdm.id}'`

        const conditionIdUserToBeDeleted=`id = '${userToBeDeleted.id}'`

        deleteLine(tableUsersAdm,conditionIdNewUserAdm)
        deleteLine(tableUsersAdm,conditionIdUserToBeDeleted)

        const body=res.body

        expect(body).toHaveProperty('error')
        expect(body.error).toBe('Only main admins')

    })

    it('Error User does not exist delete user adm',async ()=>{

        const {newToken:token,newUserAdm}=await createSession('72354856','zgetdsfgwd@gmail.com','17.046.918-3','590.673.365-56','(61) 3121-1242',true)

        const res=await request(app).delete(`${baseUrl}/7234`).set('Authorization',token)

        await deleteUserAdm(newUserAdm.id)

        const body=res.body

        expect(body).toHaveProperty('error')
        expect(body.error).toBe('User does not exist')

    })

    it('Error Main admin cannot be deleted in delete user adm',async ()=>{

        //create user main admin

        const {newToken:token,newUserAdm:userAdmLogin}=await createSession('723548478356','zsdagetdsfgwd@gmail.com','39.238.478-0','420.686.460-80','(53) 3285-5532',true)

        const tableUsersAdm='usersadm'

        const newUserAdm={
            id: '1232',
            password:await encryptPassword('123456'),
            name: faker.person.fullName(),
            email:faker.internet.email(),
            cpf:'773.643.361-50',
            rg:'48.161.016-0',
            phone:'(68) 2404-0722',
            birthday:faker.date.birthdate(),
            gender:'Masculino',
            state: 'PR',
            city: 'Pinhais',
            mainadmin:true
        }

        await insert(tableUsersAdm,newUserAdm)

     
        //delete(with error)

        const res=await request(app).delete(`${baseUrl}/${newUserAdm.id}`).set('Authorization',token)

        await deleteUserAdm(userAdmLogin.id)
        await deleteUserAdm(newUserAdm.id)

        const body=res.body

        //test

        expect(body).toHaveProperty('error')
        expect(body.error).toBe('Main admin cannot be deleted')

    })

})

//	78343456