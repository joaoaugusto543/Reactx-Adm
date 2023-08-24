import { useSelector } from "react-redux"

function useShowErrorUpdateUserAdm() {
    const {errors}=useSelector((state)=>state.userAdm)

    const adminUserUpdateErrors={}

    if(!errors){
        return adminUserUpdateErrors
    }

    if(errors.includes('The name must be at least three characters long')){
        adminUserUpdateErrors.errorName='Nome inválido'
    }

    if(errors.includes('Invalid date')){
        adminUserUpdateErrors.errorDate='Data inválida'
    }

    if(errors.includes('Minors cannot create a checking account')){
        adminUserUpdateErrors.errorDate='Menor de idade'
    }

    if(errors.includes('Invalid gender')){
        adminUserUpdateErrors.errorGender='Selecione um gênero válido'
    }

    if(errors.includes('Invalid phone')){
        adminUserUpdateErrors.errorPhone='Telefone inválido'
    }

    if(errors.includes('Invalid state')){
        adminUserUpdateErrors.errorState='Estado inválido'
    }

    if(errors.includes('Invalid city')){
        adminUserUpdateErrors.errorCity='Cidade inválida'
    }

    if(errors.includes('Passwords need to be the same') || errors.includes('Incorrect password') || errors.includes('Password must be at least 6 characters long')){
        adminUserUpdateErrors.errorPassword='Ocorreu um erro, verifique as informações inseridas.'
    }

    return adminUserUpdateErrors

}

export default useShowErrorUpdateUserAdm