const bcrypt=require('bcryptjs')

async function encryptPassword(password){
    const encryptedPassword=await bcrypt.hash(password,8)
    return encryptedPassword
}

async function verifyPassword(user,password){
    return await bcrypt.compare(password,user.password)
}

async function encryptCode(code){
    const encryptedCode=await bcrypt.hash(code,8)
    return encryptedCode
}

async function verifyCode(encryptedCode,code){
    return await bcrypt.compare(code,encryptedCode)
}

const cryptography={
    encryptPassword,
    verifyPassword,
    encryptCode,
    verifyCode
}

module.exports=cryptography
