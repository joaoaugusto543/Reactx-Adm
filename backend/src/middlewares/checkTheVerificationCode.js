const { verifyCode } = require("../services/cryptography")

async function checkTheVerificationCode(req,res,next){
    const {code,encryptedCode,newPassword,forgottenPassword}=req.body

    if(!newPassword && !forgottenPassword){
        return next()
    }

    if(!code || !encryptedCode){
        return res.status(500).json({error:'Code was not provided'})
    }

    if(await verifyCode(encryptedCode,code)){
        return next()
    }

    return res.status(500).json({error:'Invalid code'})
}

module.exports=checkTheVerificationCode