const {Router}=require('express')
const accountsControllers = require('../controllers/accountsControllers')
const auth=require('../middlewares/auth')

const routes=new Router()

routes.get('/:id',auth,accountsControllers.getAccountById)

module.exports=routes