import './FormCode.css'
import { useState } from 'react'
import {BiArrowBack} from 'react-icons/bi'
import {useSelector} from 'react-redux'


function FormCode({email,setShowFormCode,callback,type}) {

  const {encryptedCode}=useSelector((state)=>state.code)
  const [code,setCode]=useState('')

  function closeShowFormCode(){
    setShowFormCode(false)
  }

  function handleSubmit(e){
    e.preventDefault()
    callback(code,encryptedCode)
    closeShowFormCode()
  }

  return (
    <div className='backgroundFormCode' data-testid='formCode'>
        <div className={`formCode formCode${type}`}>
          <p className='text'>Enviamos um código de 5 dígitos para o email {email}</p>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Código:</span>
              <input type='text' required placeholder='código de verificação' onChange={(e)=>setCode(e.target.value)} maxLength={5} />
            </label>
            <input type='submit' value='Enviar' />
          </form>
          <p onClick={closeShowFormCode} className='backFormCode'><BiArrowBack/> Voltar</p>
        </div>
    </div>
  )
}

export default FormCode