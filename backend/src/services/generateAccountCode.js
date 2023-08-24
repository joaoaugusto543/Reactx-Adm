function generateAccountCode(){
    let code=parseInt(Math.random() * 100000) + ''

    if(code.length<5){
        while(code.length !==5){
            code='0'+code
        }
    }

    if(code.length>5){
        code=code.substring(0,5)
    }

    code+='-' + parseInt(Math.random() * 10)

    const accountCode=`0805 / ${code}`

    return accountCode

}

module.exports=generateAccountCode