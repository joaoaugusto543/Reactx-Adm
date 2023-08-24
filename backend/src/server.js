require('dotenv').config({
    path: process.env.NODE_ENV.trim() === 'test' ?  '.env.testing' : '.env'
})

const app = require('./app')

const port=process.env.PORT

app.listen(port , ()=>{
    console.log(`connected on port ${port}`)
})
