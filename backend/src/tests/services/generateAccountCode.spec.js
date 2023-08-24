const generateAccountCode = require("../../services/generateAccountCode")

describe('GenerateAccountCode',()=>{

    it('Generate code',async ()=>{

        const accountCode=generateAccountCode()

        const [,code,]=accountCode.replace('/ ','.').replace('-','.').split('.')

        console.log(code)

        expect(accountCode.indexOf('0805 / ') !== -1).toBeTruthy()
        expect( code.length === 5 ).toBeTruthy()

    })

})