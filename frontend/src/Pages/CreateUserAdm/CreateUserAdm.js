import './CreateUserAdm.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../Components/Loader/Loader'
import useShowStates from '../../Hooks/useShowStates'
import useShowCities from '../../Hooks/useShowCities'
import {FaUserPlus} from 'react-icons/fa'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { create, resetErrors, resetSuccessMessage } from '../../slices/userAdmSlices'
import useShowErrorCreateUserAdm from '../../Hooks/useShowErrorCreateUserAdm'

function CreateUserAdm() {

  const {loading,success,successMessage}=useSelector((state)=>state.userAdm)
  const dispatch=useDispatch()
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [birthday,setBirthday]=useState('')
  const [gender,setGender]=useState('')
  const [cpf,setCpf]=useState('')
  const [rg,setRg]=useState('')
  const [phone,setPhone]=useState('')
  const [state,setState]=useState('')
  const [city,setCity]=useState('')
  const [password,setPassword]=useState('')
  const [confirmPassword,setConfirmPassword]=useState('')
  const [showConfirmPassword,setShowConfirmPassword]=useState(false)
  const [showPassword,setShowPassword]=useState(false)
  const states=useShowStates()
  const cities=useShowCities(state)
  const {errorName,errorDate,errorGender,errorPhone,errorState,errorCity,errorEmail,errorPassword,errorConfirmPassword,errorCpf,errorRg}=useShowErrorCreateUserAdm()

  useEffect(()=>{
    if(success){
      setName('')
      setEmail('')
      setBirthday('')
      setGender('')
      setCpf('')
      setRg('')
      setPhone('')
      setState('')
      setCity('')
      setPassword('')
      setConfirmPassword('')
      setTimeout(()=>{
        dispatch(resetSuccessMessage())
      },3000)
    }
  },[success,dispatch])

  useEffect(()=>{
    dispatch(resetErrors())
  },[dispatch])


  function handleSubmit(e){

    e.preventDefault()

    const newUserAdm={
      name,
      email,
      birthday,
      gender,
      cpf,
      rg,
      phone,
      state,
      city,
      password,
      confirmPassword
    }

    newUserAdm.birthday=newUserAdm.birthday.split('-').reverse().join('/')

    dispatch(create(newUserAdm))

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

  function handleRg(e){
    const value=e.target.value

    //remove . or -

    let noPunctuation=value.split('.').join('')
 
    noPunctuation=noPunctuation.split('-').join('')

    const regexNumbers=/^[0-9]+$/

    if(noPunctuation.length===9 && regexNumbers.test(noPunctuation)){
      const rgWithDot=`${noPunctuation.substring(0,2)}.${noPunctuation.substring(2,5)}.${noPunctuation.substring(5,8)}-${noPunctuation.substring(8,10)}`
      setRg(rgWithDot)
      return
    }

    if(regexNumbers.test(noPunctuation) && value){
      setRg(e.target.value)
    }

    if(rg.length-1>=value.length){
      setRg(e.target.value)
      return
    }
       
    if(value.length===2 || value.length===6){
      setRg(value + '.')
    }

    if(value.length===10){
      setRg(value + '-')
    }

    return

  }


  function handlePhone(e){
    const value=e.target.value

    //remove . or -

    let noPunctuation=value.split('(').join('')

    noPunctuation=noPunctuation.split(')').join('')
 
    noPunctuation=noPunctuation.split('-').join('')

    noPunctuation=noPunctuation.split(' ').join('')

    const regexNumbers=/^[0-9]+$/

    if(noPunctuation.length===10 && regexNumbers.test(noPunctuation)){
      const phoneWithDot=`(${noPunctuation.substring(0,2)}) ${noPunctuation.substring(2,6)}-${noPunctuation.substring(6,10)}`
      setPhone(phoneWithDot)
      return
    }

    if(regexNumbers.test(noPunctuation) && value){
      setPhone(e.target.value)
    }

    if(phone.length-1>=value.length){
      setPhone(e.target.value)
      return
    }
       
    if(value.length===2){
      setPhone('(' + value + ') ')
    }

    if(value.length===9){
      setPhone(value + '-')
    }

    return

  }

  return (
    <div className='createUser'>
      {loading && <Loader type='Page'/>}
      {!loading &&
        <> 
          <h1 className='title'><FaUserPlus/>Criar administrador</h1>
          {successMessage && (<p className='sucessMessage'>{successMessage}</p>)}
          <form className='formCreate' onSubmit={handleSubmit}>
            <label>
              <span>Nome:</span>
              <input type='text' value={name} required placeholder='Digite seu nome.' onChange={(e)=>setName(e.target.value)}/>
              {errorName && <p className='errorProfile'>{errorName}</p>}
            </label>
            <label>
              <span>E-mail:</span>
              <input type='text' value={email} required placeholder='Digite seu e-mail.' onChange={(e)=>setEmail(e.target.value)}/>
              {errorEmail && <p className='errorProfile'>{errorEmail}</p>}
            </label>
            <label className='password'>
                <span>Senha:</span>
                <input required type={!showPassword ? 'password' : 'text'} placeholder='Digite sua senha.' value={password} onChange={(e)=>setPassword(e.target.value)} />
                {errorPassword && <p className='errorProfile'>{errorPassword}</p>}
                {!showPassword ? <AiFillEye onClick={()=>setShowPassword(true)}/> : <AiFillEyeInvisible onClick={()=>setShowPassword(false)}/>}
            </label>
            <label className='confirmPassword'>
                  <span>Confirme sua senha:</span>
                  <input required type={!showConfirmPassword ? 'password' : 'text'} placeholder='Digite sua senha.' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                  {!showConfirmPassword ? <AiFillEye onClick={()=>setShowConfirmPassword(true)}/> : <AiFillEyeInvisible onClick={()=>setShowConfirmPassword(false)}/>}
                  {errorConfirmPassword && <p className='errorProfile'>{errorConfirmPassword}</p>}
                </label>
            <label>
              <span>Data de nascimento:</span>
              <input type='date' required value={birthday} onChange={(e)=>setBirthday(e.target.value)}/>
              {errorDate && <p className='errorProfile'>{errorDate}</p>}
            </label>
            <label>
              <span>CPF:</span>
              <input type='text' required value={cpf} placeholder='Digite seu CPF.' onChange={handleCpf} maxLength='14'/>
              {errorCpf && <p className='errorProfile'>{errorCpf}</p>}
            </label>
            <label>
              <span>RG:</span>
              <input type='text' required value={rg} placeholder='Digite seu RG.' onChange={handleRg} maxLength='12'/>
              {errorRg && <p className='errorProfile'>{errorRg}</p>}
            </label>
            <label>
              <span>Telefone:</span>
              <input type='text' required placeholder='Digite seu telefone.' value={phone} onChange={handlePhone} maxLength='14'/>
              {errorPhone && <p className='errorProfile'>{errorPhone}</p>}
            </label>
            <label>
              <span>Estado:</span>
              {states && states.length!==0 && (
                <select required name='state' id='state' value={state} onChange={(e)=>setState(e.target.value)}>
                  <option value='Selecione seu estado'>Selecione seu estado</option>
                  {states.map((item,index)=><option key={index} value={item.uf}>{item.uf}</option>)}
                </select>
              )}
              {errorState && <p className='errorProfile'>{errorState}</p>}
            </label>
            <label>
              <span>Cidade:</span>
              {cities && (
                <select required name='city' id='city' value={city} onChange={(e)=>setCity(e.target.value)}>
                  <option value='Selecione sua cidade'>Selecione sua cidade</option>
                  {cities.map((item,index)=><option key={index} value={item.name}>{item.name}</option>)}
                </select>
              )}
              {errorCity && <p className='errorProfile'>{errorCity}</p>}
            </label>
            <label>
              <span>Gênero:</span>
              <select name='gender' required value={gender} onChange={(e)=>setGender(e.target.value)}>
                <option value=''>Selecione seu gênero</option>
                <option value='Masculino'>Masculino</option>
                <option value='Feminino'>Feminino</option>
                <option value='Outro'>Outro</option>
              </select>
              {errorGender && <p className='errorProfile'>{errorGender}</p>}
            </label>
            <input className='buttonCreate' type='submit' value='Cadastrar' />
          </form>
        </>
      }
    </div>
  )
}

export default CreateUserAdm