function welcomeUser(content){

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
                    padding:5em;
                }
                .body{
                    background-color:#000;
                }
                .welcome{
                    color: #fff;
                    text-align:center;
                }
        
                .reactx{
                    color: rgb(0, 238, 255);
                }

                .happy{
                    color:#fff;
                    text-align:center
                }

                .support{
                    text-align:center;
                    color:#fff;
                }

                .support a{
                    color:rgb(0, 238, 255)
                }

            </style>
        </head>
        <body class='body'>
            <div class='email'>
                <h1 class='welcome'>Olá, ${content.name}. Sua conta foi autorizada! Seja bem-vindo(a) ao <span class='reactx'>Reactx!</span></h1>
                <h2 class='happy'>Estamos muitos felizes por você estar conosco!!!</h2>
                <h2 class='support'>Estamos sempre a disposição, se precisar de ajuda <a href='https://unsplash.com/pt-br/fotografias/E0AHdsENmDg'>suporte.</a></h2>
            </div>   
        </body>
    </html>
    `

    return html
}

module.exports=welcomeUser