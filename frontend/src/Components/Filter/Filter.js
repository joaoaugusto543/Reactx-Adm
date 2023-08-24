import { useState } from 'react'
import useShowCities from '../../Hooks/useShowCities'
import useShowStates from '../../Hooks/useShowStates'
import closeFilter from '../../scripts/Filter/closeFilter'
import openFilter from '../../scripts/Filter/openFilter'
import './Filter.css'
import {BsFilterRight} from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import {AiOutlineClose} from 'react-icons/ai'

function Filter({filter}) {

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
    const states=useShowStates()
    const cities=useShowCities(state)

  function handleSubmit(e){
    e.preventDefault()

    const user={
      name,
      email,
      birthday,
      gender,
      cpf,
      rg,
      phone,
      state,
      city
    }

    if(user.birthday){
      user.birthday=user.birthday.split('-').reverse().join('/')
    }

    dispatch(filter(user))
    closeFilter()
  }
  
  function clearFilter(e){
    e.preventDefault()
    setName('')
    setEmail('')
    setBirthday('')
    setGender('')
    setCpf('')
    setRg('')
    setPhone('')
    setState('')
    setCity('')
    dispatch(filter({}))
    closeFilter()
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
    <>
        <button className='buttonFilter buttonOpenFilter' onClick={openFilter}><BsFilterRight/></button>
        <button className='buttonFilter buttonCloseFilter' onClick={closeFilter}><AiOutlineClose/></button>
        <div className='filter'>
            <h1>Filtro</h1>
            <form onSubmit={handleSubmit}>
                <label>
                <span>Nome:</span>
                <input type='text' value={name} placeholder='Digite seu nome.' onChange={(e)=>setName(e.target.value)}/>
                </label>
                <label>
                <span>E-mail:</span>
                <input type='text' value={email} placeholder='Digite seu e-mail.' onChange={(e)=>setEmail(e.target.value)}/>
                </label>
                <label>
                <span>Data de nascimento:</span>
                <input type='date' value={birthday} onChange={(e)=>setBirthday(e.target.value)}/>
                </label>
                <label>
                <span>CPF:</span>
                <input type='text' value={cpf} placeholder='Digite seu CPF.' onChange={handleCpf} maxLength='14'/>
                </label>
                <label>
                <span>RG:</span>
                <input type='text' value={rg} placeholder='Digite seu RG.' onChange={handleRg} maxLength='12'/>
                </label>
                <label>
                <span>Telefone:</span>
                <input type='text' placeholder='Digite seu telefone.' value={phone} onChange={handlePhone} maxLength='14'/>
                </label>
                <label>
                <span>Estado:</span>
                {states && states.length!==0 && (
                    <select name='state' id='state' value={state} onChange={(e)=>setState(e.target.value)}>
                    <option value='Selecione seu estado'>Selecione seu estado</option>
                    {states.map((item,index)=><option key={index} value={item.uf}>{item.uf}</option>)}
                    </select>
                )}
                </label>
                <label>
                <span>Cidade:</span>
                {cities && (
                    <select name='city' id='city' value={city} onChange={(e)=>setCity(e.target.value)}>
                    <option value='Selecione sua cidade'>Selecione sua cidade</option>
                    {cities.map((item,index)=><option key={index} value={item.name}>{item.name}</option>)}
                    </select>
                )}
                </label>
                <label>
                <span>Gênero:</span>
                <select name='gender' value={gender} onChange={(e)=>setGender(e.target.value)}>
                    <option value=''>Selecione seu gênero</option>
                    <option value='Masculino'>Masculino</option>
                    <option value='Feminino'>Feminino</option>
                    <option value='Outro'>Outro</option>
                </select>
                </label>
                <div className='buttonsFilter'>
                  <input className='buttonFormFilter' type='submit' value='Filtrar' />
                  <input className='buttonFormFilter' type='submit' value='Limpar' onClick={clearFilter} />
                </div>
            </form>
        </div>
    </>
  )
}

export default Filter