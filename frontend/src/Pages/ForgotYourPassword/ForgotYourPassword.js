import './ForgotYourPassword.css'
import {useEffect, useState} from 'react'
import FormCode from '../../Components/FormCode/FormCode'
import { useDispatch, useSelector } from 'react-redux'
import { forgottenPassword, resetSuccess } from '../../slices/userAdmSlices'
import { sendVerificationCode } from '../../slices/codeSlices'
import Loader from '../../Components/Loader/Loader'
import {useNavigate} from 'react-router-dom'

function ForgotYourPassword({test}) {

  const [email,setEmail]=useState('')
  const {loading}=useSelector((state)=>state.code)
  const {success,errors}=useSelector((state)=>state.userAdm)
  const [showFormCode,setShowFormCode]=useState(false)
  const [error,setError]=useState(null)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  
  useEffect(()=>{
    if(!test){
      if(showFormCode){
        dispatch(sendVerificationCode({email}))
      }
    }
  },[dispatch,showFormCode,email,test])

  useEffect(()=>{
    if(errors){
      setError('Código inválido!')
      setShowFormCode(false)
      setTimeout(()=>{
        setError(null)
      },3000)
    }
  },[errors])


  useEffect(()=>{
    if(success){
      navigate('/login')
      dispatch(resetSuccess())
    }
  },[success,navigate,dispatch])

  async function handleSubmit(e){

    e.preventDefault()

    setShowFormCode(true)

  }
  
  function changePassword(code,encryptedCode){
    const userAdm={
      email,
      code,
      encryptedCode,
      forgottenPassword:true
    }

    dispatch(forgottenPassword(userAdm))
    
  }

  return (
    <div className='forgotYourPasswordPage'>
        {loading && <Loader/>}
        {showFormCode && <FormCode email={email} callback={changePassword} setShowFormCode={setShowFormCode}/>}
        {!showFormCode && !loading &&
          <div className='forgotYourPassword'>
              <h1>Recuperar senha</h1>
              {error && <p className='error'>{error}</p>}
              <form onSubmit={handleSubmit}>
                  <label>
                      <span>E-mail:</span>
                      <input type='email' required placeholder='Digite seu e-mail' value={email} onChange={(e)=>setEmail(e.target.value)} />
                  </label>
                  <input type='submit' value='Enviar' />
              </form>
          </div>
        }
    </div>
  )
}

export default ForgotYourPassword