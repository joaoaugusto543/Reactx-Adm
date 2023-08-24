const {Router}=require('express')
const userAdmControllers = require('../controllers/userAdmControllers')
const auth=require('../middlewares/auth')
const handleValidation=require('../middlewares/handleValidation')
const userAdmValidation=require('../middlewares/usersAdmValidation')
const checkTheVerificationCode = require('../middlewares/checkTheVerificationCode')

const routes=new Router()

//usersAdm

routes.post('/',auth,userAdmValidation.createUserAdm(),handleValidation,userAdmControllers.createUserAdm)
routes.delete('/:id',auth,userAdmControllers.deleteUserAdm)
routes.put('/update',auth,checkTheVerificationCode,userAdmValidation.updateUserAdm(),handleValidation,userAdmControllers.updateUserAdm)
routes.post('/filter',auth,userAdmControllers.filterUsersAdm)
routes.get('/profile',auth,userAdmControllers.profile)
routes.get('/:id',auth,userAdmControllers.getUserAdmById)
routes.get('/',auth,userAdmControllers.getUsersAdm)
routes.post('/sendVerificationCode',userAdmControllers.sendVerificationCode)
routes.post('/forgottenPassword',checkTheVerificationCode,userAdmControllers.forgottenPassword)

module.exports=routes