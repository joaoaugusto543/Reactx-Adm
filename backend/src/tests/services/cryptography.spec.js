const { encryptPassword, verifyPassword, encryptCode, verifyCode } = require("../../services/cryptography")

describe('Cryptography',()=>{

    it('EncryptPassword and verifyPassword',async ()=>{

        const password='123456'

        const encryptedPassword=await encryptPassword(password)

        const user={
            password:encryptedPassword
        }

        const checkPassword=await verifyPassword(user,password)

        expect(checkPassword).toBeTruthy()

    })

    it('Error encryptPassword and verifyPassword',async ()=>{

        const password='123456'

        const encryptedPassword=await encryptPassword(password)

        const user={
            password:encryptedPassword
        }

        const wrongPassword='327634276'

        const checkPassword=await verifyPassword(user,wrongPassword)

        expect(checkPassword).toBeFalsy()

    })

    it('EncryptCode and verifyCode',async ()=>{

        const code='12345'

        const encryptedCode=await encryptCode(code)

        const checkCode=await verifyCode(encryptedCode,code)

        expect(checkCode).toBeTruthy()

    })

    it('Error encryptCode and verifyCode',async ()=>{

        
        const code='12345'

        const encryptedCode=await encryptCode(code)

        const wrongCode='327634276'

        const checkCode=await verifyCode(encryptedCode,wrongCode)

        expect(checkCode).toBeFalsy()

    })

})


