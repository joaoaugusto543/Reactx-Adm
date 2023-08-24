const {Router}=require('express')
const creditControllers = require('../controllers/creditControllers')
const auth = require('../middlewares/auth')

const routes=new Router()

routes.get('/',auth,creditControllers.showCreditApplications)
routes.get('/:id',auth,creditControllers.getCreditRequestById)
routes.post('/accept/:id',auth,creditControllers.acceptCreditRequest)
routes.delete('/todeny/:id',auth,creditControllers.denyCreditRequest)
routes.post('/filtercreditapplications/filter',auth,creditControllers.filterCreditApplications)

module.exports=routes