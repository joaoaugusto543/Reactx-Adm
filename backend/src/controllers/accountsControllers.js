const { select } = require("../config/db")

async function getAccountById(req,res){
    try {
        const {id}=req.params
        const table='accounts'
        const columns=['code','credit','money','extrato']
        const conditionId=`id = '${id}'`
    
        const account=(await select(table,columns,conditionId))[0]

        if(!account){
            return res.status(500).json({error:'Account does not exist'})
        }

        return res.status(200).json(account)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'Internal error'})
    }
}

const accountsControllers={
    getAccountById
}

module.exports=accountsControllers