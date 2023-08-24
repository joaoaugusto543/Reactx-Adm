function creditDenialEmail(content){

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
                <h1 class='message'>${content.name}, seu pedido de crédito foi negada.</h1>
            </div> 
        </body>
    </html>
    `

    return html

}

module.exports=creditDenialEmail