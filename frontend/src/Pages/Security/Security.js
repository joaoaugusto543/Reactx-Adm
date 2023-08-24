import { useEffect, useState } from 'react'
import './Security.css'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../Components/Loader/Loader'
import FormCode from '../../Components/FormCode/FormCode'
import { profile, resetErrors, resetSuccessMessage, update } from '../../slices/userAdmSlices'
import useShowErrorUpdateUserAdm from '../../Hooks/useShowErrorUpdateUserAdm'
import { sendVerificationCode } from '../../slices/codeSlices'

function Security({test}) {

  const [password,setPassword]=useState('')
  const [newPassword,setNewPassword]=useState('')
  const [confirmPassword,setConfirmPassword]=useState('')
  const [showFormCode,setShowFormCode]=useState(false)
  const {auth,loading}=useSelector((state)=>state.auth)
  const {loading:loadingUserAdm,successMessage}=useSelector((state)=>state.userAdm)
  const dispatch=useDispatch()
  const {errorPassword}=useShowErrorUpdateUserAdm()


  useEffect(()=>{
    if(!test){
      dispatch(profile())
    }
  },[dispatch,test])


  //generate encrypted code

  useEffect(()=>{
    if(!test){
      if(showFormCode){
        dispatch(sendVerificationCode({name:auth.name,email:auth.email}))
      }
    }
  },[dispatch,showFormCode,auth,test])

  //reset

  useEffect(()=>{
    if(successMessage){

      setPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setTimeout(()=>{
        dispatch(resetSuccessMessage())
      },3000)

    }
  },[successMessage,dispatch])

  //reset errors

  useEffect(()=>{

    if(errorPassword){
      setTimeout(()=>{
        dispatch(resetErrors())
      },3000)
    }

  },[errorPassword,dispatch])

  async function handleSubmit(e){

    e.preventDefault()

    setShowFormCode(true)

  }

  function changePassword(code,encryptedCode){

    const newSecurity={
      id:auth.id,
      newPassword,
      password,
      confirmPassword,
      code,
      encryptedCode
    }

    dispatch(update(newSecurity))

  }


  return (
    <div className='security'>
        {showFormCode && <FormCode email={auth.email} callback={changePassword} showFormCode={showFormCode} setShowFormCode={setShowFormCode} type={'Security'}/>}
        {loading && <Loader type='Page'/>}
        {!loading && loadingUserAdm && <Loader type='Page'/>}
        {!loading && !loadingUserAdm && auth &&
          <>
            <h1>Alterar senha</h1>
            {errorPassword && <p className='errorSecurity'>{errorPassword}</p>}
            {successMessage && <p className='sucessMessage'>{successMessage}</p>}
            <form onSubmit={handleSubmit} className='securityForm'>
                <label>
                    <span>Senha:</span>
                    <input type='password' placeholder='Digite sua senha atual' value={password} onChange={(e)=>setPassword(e.target.value)} />
                </label>
                <label>
                    <span>Nova senha:</span>
                    <input type='password' placeholder='Digite sua nova senha' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
                </label>
                <label>
                    <span>Confirmação da nova senha:</span>
                    <input type='password' placeholder='Digite sua nova senha' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                </label>
                <div className='button'>
                    <input type='submit' value='Editar senha'/>
                </div>
            </form>
          </>
        }
    </div>
  )
}

export default Security