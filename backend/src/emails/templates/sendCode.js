function sendCode(content){

    if(content.name){
        
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
    
                    .welcome{
                        color: #fff;
                        text-align:center;
                    }
            
                    .code span{
                        color: rgb(0, 238, 255);
                    }
    
                    .code{
                        color:#fff;
                        text-align:center
                    }
    
                </style>
            </head>
            <body class='body'>
                <div class='email'>
                    <h1 class='welcome'>Olá, ${content.name}. Insira esse código para mudar sua senha.</h1>
                    <h2 class='code'>código de verificação: <span>${content.code}</span></h2>
                </div> 
            </body>
        </html>
        `

        return html
    }

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

                .welcome{
                    color: #fff;
                    text-align:center;
                }
        
                .code span{
                    color: rgb(0, 238, 255);
                }

                .code{
                    color:#fff;
                    text-align:center
                }

            </style>
        </head>
        <body class='body'>
            <div class='email'>
                <h1 class='welcome'>Seu código de autenticação.</h1>
                <h2 class='code'>código de verificação: <span>${content.code}</span></h2>
            </div> 
        </body>
    </html>
    `

    return html


    return html

}

module.exports=sendCode