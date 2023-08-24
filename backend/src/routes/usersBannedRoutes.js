const {Router}=require('express')
const userBannedControllers = require('../controllers/userBannedControllers')
const auth=require('../middlewares/auth')

const routes=new Router()

routes.get('/',auth,userBannedControllers.showUsersBanned)
routes.get('/:id',auth,userBannedControllers.getUserBannedById)
routes.post('/:id',auth,userBannedControllers.createUserBanned)
routes.post('/unban/:id',auth,userBannedControllers.unbanUserBanned)
routes.post('/filter/usersbanned',auth,userBannedControllers.filterUsersBanned)

module.exports=routes