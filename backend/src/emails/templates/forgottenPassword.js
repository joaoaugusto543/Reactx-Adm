function forgottenPassword(content){

    const html=`
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <style>
                .email{
                    background-color:#000;
                    padding:5em;
                }

                .message{
                    color:#fff;
                    text-align:center
                }

                .warning{
                    color:red;
                }

            </style>
        </head>
        <body>
            <div class='email'>
                <h1 class='message'>${content.name}, sua nova senha é ${content.password}, acesse sua conta e mude sua senha.</h1>
                <h1 class='warning'>Se você não solicitou a alteração de senha, mude a senha da sua conta e do e-mail o mais rápido possível!</h1>
            </div> 
        </body>
    </html>
    `

    return html

}

module.exports=forgottenPassword