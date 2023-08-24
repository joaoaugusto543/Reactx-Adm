require('dotenv').config({
    path: process.env.NODE_ENV.trim() === 'test' ?  '.env.testing' : '.env'
})

const { select } = require("../config/db")
const { verifyPassword } = require("../services/cryptography")
const jwt=require('jsonwebtoken')

async function create(req,res){
    try {
        const {cpf,password}=req.body

        const conditionCpf=`cpf = '${cpf}'`

        const table='usersadm'

        const userAdm=(await select(table,'*',conditionCpf))[0]

        if(!userAdm){
            return res.status(401).json({authenticationError:'user / password invalid'})
        }
        
        if(!await verifyPassword(userAdm,password)){
            return res.status(401).json({authenticationError:'user / password invalid'})
        }

        const {id,mainadmin,name,email}=userAdm

        return res.status(200).json({
            userAdm:{
                id,
                mainadmin,
                name,
                email
            },
            token:jwt.sign({id},process.env.TOKEN_SECRET,{
                expiresIn:'7d'
            })
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'internal error'})
    }
}

const sessionsControllers={
    create
}

module.exports=sessionsControllers