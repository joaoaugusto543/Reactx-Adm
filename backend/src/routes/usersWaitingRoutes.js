const {Router}=require('express')
const usersWaitingControllers = require('../controllers/usersWaitingControllers')
const auth=require('../middlewares/auth')

const routes=new Router()

routes.get('/',auth,usersWaitingControllers.showUsersWaiting)
routes.get('/:id',auth,usersWaitingControllers.getUserWaitingById)
routes.delete('/:id',auth,usersWaitingControllers.deleteUserWaiting)
routes.post('/filterUsersWaiting/filter',auth,usersWaitingControllers.filterUsersWaiting)

module.exports=routes