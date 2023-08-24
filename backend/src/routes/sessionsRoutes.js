const {Router}=require('express')

const sessionsControllers = require('../controllers/sessionControllers')


const routes=new Router()

routes.post('/',sessionsControllers.create)

module.exports=routes