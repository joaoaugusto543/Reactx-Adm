require('dotenv').config({
    path: process.env.NODE_ENV.trim() === 'test' ?  '.env.testing' : '.env'
})

const {createTransport}=require('nodemailer')
const welcomeUser=require('../emails/templates/welcomeUser')
const bannedUser=require('../emails/templates/bannedUser')
const welcomeUserAdm = require('../emails/templates/welcomeUserAdm')
const unbanUser = require('../emails/templates/unbanUser')
const sendCode = require('../emails/templates/sendCode')
const emailToDeletedAdminUser = require('../emails/templates/emailToDeletedAdminUser')
const accountDeniedEmail = require('../emails/templates/accountDeniedEmail')
const creditDenialEmail = require('../emails/templates/creditDenialEmail')
const creditApprovalEmail = require('../emails/templates/creditApprovalEmail')
const forgottenPassword = require('../emails/templates/forgottenPassword')

function sendEmail(typeEmail,email,content){
    const transporter=createTransport({
        host:'smtp.gmail.com',
        service:'gmail',
        secure:true,
        auth:{
            user:process.env.EMAIL_REACTX,
            pass:process.env.PASSWORD_EMAIL
        }
    })

    const emailToBeSent={
        from:process.env.EMAIL_REACTX,
        to:email
    }

    if(typeEmail === 'WelcomeUser'){
        emailToBeSent.subject=`Seja bem-vindo(a) ${content.name}`
        emailToBeSent.html=welcomeUser(content)
    }

    if(typeEmail==='bannedUser'){
        emailToBeSent.subject=`Conta banida`
        emailToBeSent.html=bannedUser(content)
    }

    if(typeEmail==='WelcomeUserAdm'){
        emailToBeSent.subject=`Seja bem-vindo(a) administrador(a) ${content.name}`
        emailToBeSent.html=welcomeUserAdm(content)
    }

    if(typeEmail==='unbanUser'){
        emailToBeSent.subject=`${content.name} sua conta foi desbanida`
        emailToBeSent.html=unbanUser(content)
    }

    if(typeEmail==='sendCode'){
        if(content.name){
            emailToBeSent.subject=`${content.name} seu código de autenticação.`
        }else{
            emailToBeSent.subject='Seu código de autenticação'
        }
        emailToBeSent.html=sendCode(content)
    }

    if(typeEmail==='deleteUserAdm'){
        emailToBeSent.subject=`Obrigado ${content.name} pelos serviços prestados.`
        emailToBeSent.html=emailToDeletedAdminUser(content)
    }

    if(typeEmail==='accountDenied'){
        emailToBeSent.subject=`${content.name}, sua conta foi negada.`
        emailToBeSent.html=accountDeniedEmail(content)
    }

    if(typeEmail==='creditDenialEmail'){
        emailToBeSent.subject='Seu pedido de crédito foi negado.'
        emailToBeSent.html=creditDenialEmail(content)
    }

    if(typeEmail==='creditApprovalEmail'){
        emailToBeSent.subject='Seu pedido de crédito foi aceito.'
        emailToBeSent.html=creditApprovalEmail(content)
    }

    if(typeEmail==='forgottenPassword'){
        emailToBeSent.subject='Nova senha da sua conta Reactx.'
        emailToBeSent.html=forgottenPassword(content)
    }

    transporter.sendMail(emailToBeSent,(err)=>{
        if(err){
            console.log('Email sending failure')
            return
        }

        return true
    })
}

module.exports=sendEmail