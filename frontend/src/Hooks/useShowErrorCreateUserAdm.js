import { useSelector } from "react-redux"

function useShowErrorCreateUserAdm() {
    const {errors}=useSelector((state)=>state.userAdm)

    const adminUserCreateErrors={}

    if(!errors){
        return adminUserCreateErrors
    }

    if(errors.includes('The name must be at least three characters long')){
        adminUserCreateErrors.errorName='Nome inválido'
    }

    if(errors.includes('Invalid email')){
        adminUserCreateErrors.errorEmail='E-mail inválido'
    }

    if(errors.includes('Password must be at least 6 characters long')){
        adminUserCreateErrors.errorPassword='A senha precisa ter 6 caracteres'
    }

    if(errors.includes('Passwords need to be the same')){
        adminUserCreateErrors.errorConfirmPassword='As senhas precisam ser iguais'
    }

    if(errors.includes('Invalid CPF')){
        adminUserCreateErrors.errorCpf='CPF inválido'
    }

    if(errors.includes('Invalid RG')){
        adminUserCreateErrors.errorRg='RG inválido'
    }

    if(errors.includes('Invalid date')){
        adminUserCreateErrors.errorDate='Data inválida'
    }

    if(errors.includes('Minors cannot create a checking account')){
        adminUserCreateErrors.errorDate='Menor de idade'
    }

    if(errors.includes('Invalid gender')){
        adminUserCreateErrors.errorGender='Selecione um gênero válido'
    }

    if(errors.includes('Invalid phone')){
        adminUserCreateErrors.errorPhone='Telefone inválido'
    }

    if(errors.includes('Invalid state')){
        adminUserCreateErrors.errorState='Estado inválido'
    }

    if(errors.includes('Invalid city')){
        adminUserCreateErrors.errorCity='Cidade inválida'
    }

    return adminUserCreateErrors

}

export default useShowErrorCreateUserAdm