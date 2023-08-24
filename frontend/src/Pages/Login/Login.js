import './Login.css'

import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../slices/authSlices'
import { AiOutlineArrowUp } from 'react-icons/ai'

function Login() {

  const [cpf,setCpf]=useState('')
  const [password,setPassword]=useState('')
  const dispatch=useDispatch()

  function handleSubmit(e){
    e.preventDefault()

    const auth={
      cpf,
      password
    }

    dispatch(login(auth))
    
  }

  function handleCpf(e){
    const value=e.target.value

    //remove . or -

    let noPunctuation=value.split('.').join('')
 
    noPunctuation=noPunctuation.split('-').join('')

    const regexNumbers=/^[0-9]+$/

    if(noPunctuation.length===11 && regexNumbers.test(noPunctuation)){
      const cpfWithDot=`${noPunctuation.substring(0,3)}.${noPunctuation.substring(3,6)}.${noPunctuation.substring(6,9)}-${noPunctuation.substring(9,11)}`
      setCpf(cpfWithDot)
      return
    }

    if(regexNumbers.test(noPunctuation) && value){
      setCpf(e.target.value)
    }

    if(cpf.length-1>=value.length){
      setCpf(e.target.value)
      return
    }
       
    if(value.length===3 || value.length===7){
      setCpf(value + '.')
    }

    if(value.length===11){
      setCpf(value + '-')
    }

    return

  }

  return (
    <div className='login'>
        <section className='banner'>
          <img src='https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80' alt='Homem de terno' />
          <p className='drag'>Arrasta pra cima <AiOutlineArrowUp/></p>
        </section>
        <div className='loginForm'>
          <div className='boxLogin'>
            <h1>Reactx</h1>
            <form onSubmit={handleSubmit}>
              <label>
                <span>CPF:</span>
                <input type='text' placeholder='Digite seu cpf' value={cpf} onChange={handleCpf} maxLength={14}/>
              </label>
              <label>
                <span>Senha:</span>
                <input type='password' placeholder='Digite sua senha' value={password} onChange={(e)=>setPassword(e.target.value)} />
              </label>
              <Link to='/forgotyourpassword'>Esqueceu sua senha?</Link>
              <input type='submit' value='Entrar' />
            </form>
          </div>
        </div>
    </div>
  )
}

export default Login