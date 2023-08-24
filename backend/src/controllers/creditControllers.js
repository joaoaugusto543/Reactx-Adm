const { select, update, deleteLine } = require('../config/db')
const {sendCreditDenialEmail,sendCreditApprovalEmail} = require('../emails/emails')

async function showCreditApplications(req,res){
    try {
        const table='creditapplications'
        const columns=['id','name']
        
        const requestedCredits=await select(table,columns)

        return res.status(200).json(requestedCredits)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'internal error'})
    }
}

async function acceptCreditRequest(req,res){
    try {
        const {id}=req.params

        const tableCreditApplications='creditapplications'
        
        const columns=['id','email','name','value','idaccount']

        const conditionId=`id = '${id}'`

        const creditApplication=(await select(tableCreditApplications,columns,conditionId))[0]
  
        if(!creditApplication){
            return res.status(500).json({error:'User does not exist'})
        }

        const {value,idaccount}=creditApplication

        const tableAccounts='accounts'

        const conditionIdAccount=`id = '${idaccount}'`

        const columnsAccounts=['id','credit','total']

        const account=(await select(tableAccounts,columnsAccounts,conditionIdAccount))[0]

        if(!account){
            return res.status(500).json({error:'Account does not exist'})
        }

        const newCredit=(value + parseFloat(account.credit)).toFixed(2)
        const newTotal=(value + parseFloat(account.total)).toFixed(2)

        console.log(newCredit)
        
        const set=`credit = '${newCredit}', total = '${newTotal}'`
        
        await update(tableAccounts,set,conditionIdAccount)

        await deleteLine(tableCreditApplications,conditionId)

        sendCreditApprovalEmail(creditApplication.email,{name:creditApplication.name})

        return res.status(200).json(creditApplication)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'internal error'})
    }
}

async function denyCreditRequest(req,res){
    try {

        const {id}=req.params

        const tableCreditApplications='creditapplications'
        
        const columns=['id','email','name']

        const conditionId=`id = '${id}'`

        const creditApplication=(await select(tableCreditApplications,columns,conditionId))[0]

        if(!creditApplication){
            return res.status(500).json({error:'User does not exist'})
        }

        await deleteLine(tableCreditApplications,conditionId)

        sendCreditDenialEmail(creditApplication.email,{name:creditApplication.name})

        return res.status(200).json(creditApplication)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'internal error'})
    }
}

async function getCreditRequestById(req,res){
    try {

        const {id}=req.params

        const table='creditapplications'
        
        const columns=['birthday','city','cpf','email','gender','idaccount','name','phone','rg','state','value']

        const conditionId=`id = '${id}'`

        const creditRequest=(await select(table,columns,conditionId))[0]

        if(!creditRequest){
            return res.status(500).json({error:'User does not exist'})
        }

        return res.status(200).json(creditRequest)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'internal error'})  
    }
}


async function filterCreditApplications(req,res){
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

        const table='creditapplications'

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

        const credits=await select(table,columns,condition)

        return res.status(200).json(credits)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'internal error'})
    }
}

const creditControllers={
    showCreditApplications,
    acceptCreditRequest,
    denyCreditRequest,
    getCreditRequestById,
    filterCreditApplications
}

module.exports=creditControllers
