import './Credits.css'
import Loader from '../../Components/Loader/Loader'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {BiMoney} from 'react-icons/bi'
import { useEffect, useState } from 'react'
import { acceptCreditRequest, denyCreditRequest, filterCreditapplications, showCreditApplications } from '../../slices/creditSlices'
import Filter from '../../Components/Filter/Filter'
import Warning from '../../Components/Warning/Warning'

function Credits({test}) {

  const {creditApplications,loading}=useSelector((state)=>state.credit)
  const [showWarningAcceptance,setShowWarningAcceptance]=useState(false)
  const [showWarningDenial,setShowWarningDenial]=useState(false)
  const [idWarning,setIdWarning]=useState('')
  const [nameWarning,setNameWarning]=useState('')
  const dispatch=useDispatch()

  useEffect(()=>{
    if(!test){
      dispatch(showCreditApplications())
    }
  },[dispatch,test])

  function handleAcceptCreditRequest(id){
    dispatch(acceptCreditRequest({id}))
  }

  function handleDenyCreditRequest(id){
    dispatch(denyCreditRequest({id}))
  }

  function handleShowWarningAcceptance(name,id){
    setShowWarningAcceptance(true)
    setIdWarning(id)
    setNameWarning(name)
  }

  function handleShowWarningDenial(name,id){
    setShowWarningDenial(true)
    setIdWarning(id)
    setNameWarning(name)
  }

  function closeWarningAcceptance(){
    setShowWarningAcceptance(false)
  }

  function closeWarningDenial(){
    setShowWarningDenial(false)
  }

  return (
    <div className='creditsPage'>
        <Filter filter={filterCreditapplications}/>
        {loading && <Loader type={'Page'}/>}        
        <h1>Pedidos de crédito</h1>
        {showWarningAcceptance && <Warning name={nameWarning} callback={handleAcceptCreditRequest} action='aceitar o pedido d' closeWarning={closeWarningAcceptance} id={idWarning}/>}                
        {showWarningDenial && <Warning name={nameWarning} callback={handleDenyCreditRequest} action='negar o pedido d' closeWarning={closeWarningDenial} id={idWarning}/>}
        {!loading && creditApplications &&
            <ul className='credits'>
                {creditApplications.lenght!==0 && creditApplications.map(credit=>(
                    <li key={credit.id}>
                        <div className='credit'>
                            <span><BiMoney/>{credit.name}</span>
                            <div>
                                <Link to={`/credit/${credit.id}`}>Ver</Link>
                                {!showWarningAcceptance && !showWarningDenial && 
                                  <>
                                    <button className='accept' onClick={()=>handleShowWarningAcceptance(credit.name,credit.id)}>Aceitar</button>
                                    <button className='deny'onClick={()=>handleShowWarningDenial(credit.name,credit.id)}>Negar</button>
                                  </>
                                }
                            </div>
                        </div>
                    </li>
                
                ))}
            </ul>
        }
    </div>
  )
}

export default Credits