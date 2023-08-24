const { select, deleteLine } =require('../config/db')
const { sendAccountDeniedEmail } = require('../emails/emails')

async function showUsersWaiting(req,res){
    try {

        const table='userswaiting'
        const columns=['id','name','cpf','phone','email','rg']

        const usersWaiting=await select(table,columns)

        return res.status(200).json(usersWaiting)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'Internal error'})
    }
}

async function getUserWaitingById(req,res){
    try {

        const {id}=req.params
        const tableUsersWaiting='userswaiting'
        const columns=['birthday','city','cpf','email','gender','name','phone','rg','state']
        const conditionId=`id = '${id}'`

        const userWaiting=(await select(tableUsersWaiting,columns,conditionId))[0]
    
        if(!userWaiting){
            return res.status(500).json({error:'User does not exist'})
        }

        return res.status(200).json(userWaiting)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'Internal error'})
    }
}

async function deleteUserWaiting(req,res){
    try {

        const {id}=req.params
        const tableUsersWaiting='userswaiting'
        const columns=['id','name','email']
        const conditionId=`id = '${id}'`

        const userWaiting=(await select(tableUsersWaiting,columns,conditionId))[0]
    
        if(!userWaiting){
            return res.status(500).json({error:'User does not exist'})
        }

        await deleteLine(tableUsersWaiting,conditionId)

        sendAccountDeniedEmail(userWaiting.email,{name:userWaiting.name})

        return res.status(200).json(userWaiting)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'Internal error'})
    }
}

async function filterUsersWaiting(req,res){
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

        const table='userswaiting'

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

        const usersWaiting=await select(table,columns,condition)

        return res.status(200).json(usersWaiting)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'internal error'})
    }
}

const usersWaitingControllers={
    showUsersWaiting,
    getUserWaitingById,
    deleteUserWaiting,
    filterUsersWaiting
}

module.exports=usersWaitingControllers