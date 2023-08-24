import './Credit.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Loader from '../../Components/Loader/Loader'
import { IoChevronBackOutline } from 'react-icons/io5'
import { getAccountById } from '../../slices/accountsSlices'
import { getCreditRequestById } from '../../slices/creditSlices'
import {MdKeyboardArrowRight} from 'react-icons/md'

function Credit({test}) {

  const {requestedCredits,loading}=useSelector((state)=>state.credit)
  const {account,loading:loadingAccount}=useSelector((state)=>state.account)
  const dispatch=useDispatch()
  const {id}=useParams()

  useEffect(()=>{
    if(!test){
      dispatch(getCreditRequestById({id}))
    }
  },[dispatch,id,test])

  useEffect(()=>{
    if(!test){
      if(requestedCredits){
        dispatch(getAccountById({id:requestedCredits.idaccount}))
      }
    }
  },[dispatch,requestedCredits,test])


  return (
    <div className='creditPage'>
        {loading && <Loader type={'Page'}/>}
        {loadingAccount && !loading && <Loader type={'Page'}/>}
        {requestedCredits && account && !loading && !loadingAccount &&
            <div className='creditProfile'>
                <h1>{requestedCredits.name}</h1>
                <p><span>E-mail:</span> {requestedCredits.email}</p>
                <p><span>Gênero:</span> {requestedCredits.gender}</p>
                <p><span>Data de nascimento:</span> {requestedCredits.birthday}</p>
                <p><span>Telefone:</span> {requestedCredits.phone}</p>
                <p><span>CPF:</span> {requestedCredits.cpf}</p>
                <p><span>RG:</span> {requestedCredits.rg}</p>
                <p><span>Estado:</span> {requestedCredits.state}</p>
                <p><span>Cidade:</span> {requestedCredits.city}</p>
                <h1>Conta</h1>
                <p><span>Código:</span> {account.code}</p>
                <p><span>Saldo:</span> {`R$ ${account.money}`}</p>
                <p><span>Crédito:</span> {`R$ ${account.credit}`}</p>
                <p><span>Total:</span> {`R$ ${account.money + account.credit}`}</p>
                <h1>Pedido</h1>
                <p><span>Valor:</span> {`R$ ${requestedCredits.value}`}</p>
                <Link className='back' data-testid='back' to='/credits'><IoChevronBackOutline/> Voltar</Link>
                <Link className='backMobile' data-testid='backMobile' to='/credits'><MdKeyboardArrowRight/> Voltar</Link>
            </div>
        }
    </div>
  )
}

export default Credit