const { select, insert, deleteLine }=require('../config/db')
const { v4: uuidv4 } = require('uuid')
const generateAccountCode = require('../services/generateAccountCode')
const { sendWelcomeEmailToUser } = require('../emails/emails')

async function showUsers(req,res){
    try {

        const table='users'
        const columns=['id','gender','name','state']

        const users=await select(table,columns)

        return res.status(200).json(users)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'Internal error'})
    }
}

async function getUserById(req,res){
    try {

        const {id}=req.params
        const table='users'
        const columns=['birthday','city','cpf','email','gender','idaccount','name','phone','rg','state']
        const conditionId=`id ='${id}'`
        
        const user=(await select(table,columns,conditionId))[0]

        if(!user){
            return res.status(500).json({error:'User does not exist'})
        }

        return res.status(200).json(user)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'Internal error'})
    }
}

async function createUser(req,res){
    try {

        const {id}=req.params
        const {cpf,phone,email,rg}=req.body
        const tableUsersWaiting='userswaiting'
        const conditionId=`id = '${id}'`
        const conditionCpfOrEmail=` cpf = '${cpf}' OR email = '${email}' OR phone = '${phone}' OR rg = '${rg}'`

        const userWaiting=(await select(tableUsersWaiting,'*',conditionId))[0]

        if(!userWaiting){
            return res.status(500).json({error:'User does not exist'})
        }

        const tableUsersBanned='usersbanned'
        const columnsUserBanned=['id']

        const userBanned=(await select(tableUsersBanned,columnsUserBanned,conditionCpfOrEmail))[0]
        
        if(userBanned){
            return res.status(500).json({error:'User banned'})
        }

        const idAccount=uuidv4()

        const tableAccounts='accounts'

        const code=generateAccountCode()

        const newAccount={
            id:idAccount,
            code,
            extrato:[]
        }

        await insert(tableAccounts,newAccount)

        const tableUsers='users'

        const newUser={...userWaiting,idaccount:idAccount}

        await insert(tableUsers,newUser)

        const columnsTableUsers=['birthday','city','cpf','email','gender','id','name','phone','rg','state']
        
        const user=(await select(tableUsers,columnsTableUsers,conditionId))[0]
        
        const conditionAccountId=`id = '${idAccount}'`

        const account=(await select(tableAccounts,'*',conditionAccountId))[0]

        await deleteLine(tableUsersWaiting,conditionId)

        sendWelcomeEmailToUser(user.email,{name:user.name})
        
        return res.status(200).json({user,account})

    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'Internal error'})
    }
}

async function filterUsers(req,res){
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

        const table='users'

        let condition=``

        const columns=['id','name']

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

        const users=await select(table,columns,condition)

        return res.status(200).json(users)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'internal error'})
    }
}


const usersControllers={
    showUsers,
    createUser,
    getUserById,
    filterUsers
}

module.exports=usersControllers