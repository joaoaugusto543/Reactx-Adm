function welcomeUserAdm(content){

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

                .happy,.informations{
                    color:#fff;
                    text-align:center
                }

                #access{
                    background-color:rgb(0, 238, 255);
                    padding:1em 0;
                    width:50%;
                    color:#000;
                    text-decoration:none;
                    font-size:16px;
                    border-radius: 30px;
                }

                .link{
                    text-align:center;
                    margin-top: 3.5em;
                }

            </style>
        </head>
        <body class='body'>
            <div class='email'>
                <h1 class='welcome'>Olá, ${content.name}. Seja bem-vindo(a) ao <span class='reactx'>time Reactx!</span></h1>
                <h2 class='happy'>Estamos muitos felizes em trabalhar com você!!!</h2>
                <h2 class='informations'>Acesse sua conta usando seu cpf e a senha ${content.password}</h2>
                <div class='link'>
                    <a href='https://unsplash.com/pt-br/fotografias/E0AHdsENmDg' id='access'>Acessar conta</a>
                </div>
            </div>   
        </body>
    </html>
    `

    return html
}

module.exports=welcomeUserAdm