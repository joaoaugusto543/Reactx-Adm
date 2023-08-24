const { insert, deleteLine, select } = require('../config/db')
const { sendAnEmailBanningTheUser, sendAnEmailUnbanTheUser } = require('../emails/emails')

async function createUserBanned(req,res){
    try {

        const {id}=req.params
        const tableUsers='users'
        const conditionId=`id = '${id}'`

        const user=(await select(tableUsers,'*',conditionId))[0]

        if(!user){
            return res.status(500).json({error:'User does not exist'})
        }

        const tableUsersBanned='usersbanned'

        const columnsTableUsersBanned=['birthday','city','cpf','email','gender','id','name','phone','rg','state']

        await insert(tableUsersBanned,user)

        const userBanned=(await select(tableUsersBanned,columnsTableUsersBanned,conditionId))[0]

        await deleteLine(tableUsers,conditionId)

        sendAnEmailBanningTheUser(userBanned.email,{name:userBanned.name})

        return res.status(200).json(userBanned)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'Internal error'})
    }
}

async function showUsersBanned(req,res){
    try {

        const tableUsersBanned='usersbanned'
        const columns=['id','name']

        const usersBanned=await select(tableUsersBanned,columns)

        return res.status(200).json(usersBanned)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'Internal error'})
    }
}

async function getUserBannedById(req,res){
    try {

        const {id}=req.params
        const table='usersbanned'
        const columns=['birthday','city','cpf','email','gender','idaccount','name','phone','rg','state']
        const conditionId=`id = '${id}'`

        const userBanned=(await select(table,columns,conditionId))[0] 

        if(!userBanned){
            return res.status(500).json({error:'User does not exist'})
        }

        return res.status(200).json(userBanned)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'Internal error'}) 
    }
}

async function unbanUserBanned(req,res){
    try {

        const {id}=req.params
        const tableUsersBanned='usersbanned'
        const conditionId=`id = '${id}'`

        const userBanned=(await select(tableUsersBanned,'*',conditionId))[0] 

        if(!userBanned){
            return res.status(500).json({error:'User does not exist'})
        }

        const tableUsers='users'

        await insert(tableUsers,userBanned)

        const user=(await select(tableUsers,'*',conditionId))[0]

        await deleteLine(tableUsersBanned,conditionId)

        sendAnEmailUnbanTheUser(user.email,{name:user.name})

        return res.status(200).json(user)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'Internal error'}) 
    }
}

async function filterUsersBanned(req,res){
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

        const table='usersbanned'

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

const userBannedControllers={
    createUserBanned,
    showUsersBanned,
    getUserBannedById,
    unbanUserBanned,
    filterUsersBanned
}

module.exports=userBannedControllers