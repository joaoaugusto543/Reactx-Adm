const { insert, select, deleteLine, update } = require("../config/db")
const { encryptPassword, encryptCode } = require("../services/cryptography")
const { v4: uuidv4 } = require('uuid')
const {sendWelcomeEmailToUserAdm, sendVerificationEmail, sendAnEmailDelteUserAdm, sendForgottenPassword}=require('../emails/emails')

async function createUserAdm(req,res){
    try {
        const {name,email,password,cpf,phone,birthday,gender,rg,state,city}=req.body

        const runningAdminUser=req.userAdm

        if(!runningAdminUser.mainadmin){
            return res.status(500).json({error:'Only main admins'})
        }

        const id=uuidv4()

        const table='usersadm'

        const columns=['id','name','email','cpf','rg','birthday','gender','city','state','mainadmin']

        const conditionCpfOrEmail=` cpf = '${cpf}' OR email = '${email}' OR phone = '${phone}'`

        const user=(await select(table,columns,conditionCpfOrEmail))[0]
        
        if(user){
            return res.status(500).json({error:'User already exists'})
        }

        const encryptedPassword=await encryptPassword(password)

        const mainadmin=false

        const userAdm={
            id,
            name,
            email,
            password:encryptedPassword,
            cpf,
            phone,
            birthday,
            gender,
            mainadmin,
            rg,
            state,
            city
        }


        await insert(table, userAdm)

        sendWelcomeEmailToUserAdm(userAdm.email,{name: userAdm.name,password})

        const conditionId=`id = '${id}'`

        const newUserAdm=(await select(table,columns,conditionId))[0]

        return res.status(200).json(newUserAdm)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'internal error'})
    }
}

async function deleteUserAdm(req,res){
    try {
        const {id}=req.params

        const table='usersadm'

        const columns=['id','name','email','cpf','rg','birthday','gender','city','state','mainadmin']

        const conditionId=`id = '${id}'`

        const admUserDeleted=(await select(table,columns,conditionId))[0]

        const runningAdminUser=req.userAdm

        if(runningAdminUser.id===id){
            return res.status(500).json({error:'Cannot delete your account'})
        }

        if(!runningAdminUser.mainadmin){
            return res.status(500).json({error:'Only main admins'})
        }

        if(!admUserDeleted){
            return res.status(500).json({error:'User does not exist'})
        }

        if(admUserDeleted.mainadmin){
            return res.status(500).json({error:'Main admin cannot be deleted'})
        }

        await deleteLine('usersadm',`id = '${id}'`)

        sendAnEmailDelteUserAdm(admUserDeleted.email,{name:admUserDeleted.name})

        return res.status(200).json(admUserDeleted)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'internal error'})
    }
}

async function updateUserAdm(req,res){
    try {

        const {name,newPassword,phone,birthday,gender,state,city}=req.body

        const userAdm=req.userAdm

        if(!userAdm){
            return res.status(500).json({error:'User does not exist'})
        }
        
        if(newPassword){
            userAdm.password=await encryptPassword(newPassword)
        }

        if(name){
            userAdm.name=name
        }

        if(phone){
            userAdm.phone=phone
        }

        if(birthday){
            userAdm.birthday=birthday
        }

        if(gender){
            userAdm.gender=gender
        }

        if(city){
            userAdm.city=city
        }

        if(state){
            userAdm.state=state
        }

        const table='usersadm'

        const columns=['id','name','email','cpf','rg','birthday','gender','city','state','mainadmin']

        const conditionId=`id = '${userAdm.id}'`

        const set=` name = '${userAdm.name}' , password = '${userAdm.password}' , phone = '${userAdm.phone}' , birthday = '${userAdm.birthday}' , gender = '${userAdm.gender}' ,city = '${userAdm.city}' , state = '${userAdm.state}'`

        await update(table,set,conditionId)

        const updatedUser=(await select(table,columns,conditionId))[0]

        return res.status(200).json(updatedUser)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'internal error'})
    }
}

async function filterUsersAdm(req,res){
    try {

        function verifyCondition(condition,column,value){
        
            //checks if the condition already has an attribute
        
            if(!condition){
                condition = condition + ` ${column} = '${value}'` 
            }else{
                condition = condition + ` AND ${column} = '${value}'` 
            }
        
            return condition
        }
        
        const {name,email,phone,birthday,gender,cpf}=req.body

        const table='usersadm'

        let condition=``

        const columns=['id','name','mainadmin']

        if(name){
            condition = condition + ` name LIKE '${name}%'`
        }

        if(email){
            condition = verifyCondition(condition,'email',email)
        }

        if(phone){
            condition = verifyCondition(condition,'phone',phone)

        }

        if(birthday){
            condition = verifyCondition(condition,'birthday',birthday)
        }

        if(gender){
            condition = verifyCondition(condition,'gender',gender)
        }

        if(cpf){
            condition = verifyCondition(condition,'cpf',cpf)
        }

        const usersAdm=await select(table,columns,condition)

        return res.status(200).json(usersAdm)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'internal error'})
    }
}

async function getUserAdmById(req,res){
    try {
        const {id}=req.params

        const conditionId=`id = '${id}'`

        const table='usersadm'

        const columns=['id','name','email','cpf','rg','birthday','gender','city','state','mainadmin','phone']

        const userAdm=(await select(table,columns,conditionId))[0]

        if(!userAdm){
            return res.status(200).json({error:'User does not exist'})
        }

        return res.status(200).json(userAdm)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'internal error'})
    }
}

async function getUsersAdm(req,res){
    try {
        const table='usersadm'

        const columns=['id','name','mainadmin']

        const usersAdm=await select(table,columns)

        return res.status(200).json(usersAdm)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'internal error'})
    }
}

async function profile(req,res){
    try {
        const userAdm=req.userAdm

        if(!userAdm){
            return res.status(500).json({error:'User does not exist'})
        }

        return res.status(200).json(userAdm)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'internal error'})
    }
}

async function sendVerificationCode(req,res){
    try {

        const {name,email}=req.body

        const table='usersadm'

        const columns=['id']

        const conditionEmail=`email = '${email}'`

        const userAdm=(await select(table,columns,conditionEmail))[0]

        if(!userAdm){
            return res.status(500).json({error:'User does not exist'})
        }

        const code=uuidv4().substring(0,5)

        const encryptedCode=await encryptCode(code)

        sendVerificationEmail(email,{name,code})

        return res.status(200).json({encryptedCode})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'internal error'})
    }
}

async function forgottenPassword(req,res){
    try {
        const {email}=req.body

        const table='usersadm'

        const columns=['id','name','email']

        const conditionEmail=`email = '${email}'`

        const userAdm=(await select(table,columns,conditionEmail))[0]

        if(!userAdm){
            return res.status(500).json({error:'User does not exist'})
        }

        const newPassword=uuidv4().substring(0,8)

        const newEncryptedPassword=await encryptPassword(newPassword)

        const set=`password = '${newEncryptedPassword}'`

        await update(table,set,conditionEmail)

        res.status(200).json({sucess:'Updated userAdm!'})

        const updatedUserAdm=(await select(table,columns,conditionEmail))[0]

        sendForgottenPassword(updatedUserAdm.email,{name:updatedUserAdm.name,password:newPassword})

        return

    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'internal error'})
    }
}

const userAdmControllers={
    createUserAdm,
    deleteUserAdm,
    updateUserAdm,
    filterUsersAdm,
    getUserAdmById,
    getUsersAdm,
    profile,
    sendVerificationCode,
    forgottenPassword
}

module.exports=userAdmControllers

