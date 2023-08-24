function emailToDeletedAdminUser(content){

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

            </style>
        </head>
        <body>
            <div class='email'>
                <h1 class='message'>${content.name}, infelizmente tomamos a decisão de fazer seu desligamento</h1>
                <h2 class='message'>Obrigado pelos serviços prestados! A equipe Reactx te deseja sorte no próximo emprego, abraço!</h2>
            </div> 
        </body>
    </html>
    `

    return html

}

module.exports=emailToDeletedAdminUser