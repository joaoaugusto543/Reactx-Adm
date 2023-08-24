require('dotenv').config({
    path: process.env.NODE_ENV.trim() === 'test' ?  '.env.testing' : '.env'
})

const jwt=require('jsonwebtoken')
const {promisify}=require('util')
const { select } = require('../config/db')

async function auth(req,res,next){
    const authHeader=req.headers.authorization

    if(!authHeader){
        return res.status(401).json({error:'Token was not provided'})
    }

    const [,token]=authHeader.split(' ')

    const secret=process.env.TOKEN_SECRET
  
    try {
        const decoded=await promisify(jwt.verify)(token,secret)

        const conditionId=`id = '${decoded.id}'` 

        const table='usersadm'

        const columns='*'

        req.userAdm=(await select(table,columns,conditionId))[0]

        return next()

    } catch (error) {
        return res.status(401).json({error:'Invalid token.'})
    }
}

module.exports=auth