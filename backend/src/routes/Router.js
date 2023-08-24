const express=require('express')
const Router=express()

Router.use('/api/usersadm',require('./userAdmRoutes'))
Router.use('/api/session',require('./sessionsRoutes'))
Router.use('/api/states',require('./statesRoutes'))
Router.use('/api/cities',require('./citiesRoutes'))
Router.use('/api/userswaiting',require('./usersWaitingRoutes'))
Router.use('/api/users',require('./usersRoutes'))
Router.use('/api/accounts',require('./accountRoutes'))
Router.use('/api/usersBanned',require('./usersBannedRoutes'))
Router.use('/api/creditApplications',require('./creditRoutes'))



module.exports=Router