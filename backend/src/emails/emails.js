const sendEmail = require("../services/sendEmail")

async function sendWelcomeEmailToUser(email,content){

    const typeEmail='WelcomeUser'

    sendEmail(typeEmail,email,content)

    return true
        
}


async function sendWelcomeEmailToUserAdm(email,content){

    const typeEmail='WelcomeUserAdm'

    sendEmail(typeEmail,email,content)

    return true

}

async function sendVerificationEmail(email,content){
    try {

        const typeEmail='sendCode'

        sendEmail(typeEmail,email,content)

        return
        
    } catch (error) {
        console.log(error)
        return
    }
}

async function sendAnEmailBanningTheUser(email,content){
    try {

        const typeEmail='bannedUser'

        sendEmail(typeEmail,email,content)

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'internal error'})
    }
}

async function sendAnEmailUnbanTheUser(email,content){
    try {

        const typeEmail='unbanUser'

        sendEmail(typeEmail,email,content)

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'internal error'})
    }
}

async function sendAnEmailDelteUserAdm(email,content){
    try {

        const typeEmail='deleteUserAdm'

        sendEmail(typeEmail,email,content)

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'internal error'})
    }
}

async function sendAccountDeniedEmail(email,content){
    try {

        const typeEmail='accountDenied'

        sendEmail(typeEmail,email,content)

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'internal error'})
    }
}

async function sendCreditDenialEmail(email,content){
    try {
        const typeEmail='creditDenialEmail'

        sendEmail(typeEmail,email,content)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'internal error'})
    }
}

async function sendCreditApprovalEmail(email,content){
    try {
        const typeEmail='creditApprovalEmail'

        sendEmail(typeEmail,email,content)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'internal error'})
    }
}

async function sendForgottenPassword(email,content){
    try {
        const typeEmail='forgottenPassword'

        sendEmail(typeEmail,email,content)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'internal error'})
    }
}

const userAdmControllers={
    sendWelcomeEmailToUser,
    sendVerificationEmail,
    sendAnEmailBanningTheUser,
    sendWelcomeEmailToUserAdm,
    sendAnEmailUnbanTheUser,
    sendAnEmailDelteUserAdm,
    sendAccountDeniedEmail,
    sendCreditDenialEmail,
    sendCreditApprovalEmail,
    sendForgottenPassword
}

module.exports=userAdmControllers