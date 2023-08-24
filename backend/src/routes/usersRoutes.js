const {Router}=require('express')
const usersControllers = require('../controllers/usersControllers')
const auth=require('../middlewares/auth')

const routes=new Router()

routes.get('/',auth,usersControllers.showUsers)
routes.get('/:id',auth,usersControllers.getUserById)
routes.post('/:id',auth,usersControllers.createUser)
routes.post('/filter/users',auth,usersControllers.filterUsers)

module.exports=routes