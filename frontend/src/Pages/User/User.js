import './User.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getUserById } from '../../slices/userSlices'
import Loader from '../../Components/Loader/Loader'
import { IoChevronBackOutline } from 'react-icons/io5'
import { getAccountById } from '../../slices/accountsSlices'
import {MdKeyboardArrowRight} from 'react-icons/md'

function User({test}) {

  const {user,loading}=useSelector((state)=>state.user)
  const {account,loading:loadingAccount}=useSelector((state)=>state.account)
  const dispatch=useDispatch()
  const {id}=useParams()

  useEffect(()=>{
    if(!test){
      dispatch(getUserById({id}))
    }
  },[dispatch,id,test])

  useEffect(()=>{
    if(!test){
      if(user){
        dispatch(getAccountById({id:user.idaccount}))
      }
    }
  },[dispatch,user,test])

  return (
    <div className='userPage'>
        {loading && <Loader type={'Page'}/>}
        {loadingAccount && !loading && <Loader type={'Page'}/>}
        {user && account && !loading && !loadingAccount &&
            <div className='userProfile'>
                <h1>{user.name}</h1>
                <p><span>E-mail:</span> {user.email}</p>
                <p><span>Gênero:</span> {user.gender}</p>
                <p><span>Data de nascimento:</span> {user.birthday}</p>
                <p><span>Telefone:</span> {user.phone}</p>
                <p><span>CPF:</span> {user.cpf}</p>
                <p><span>RG:</span> {user.rg}</p>
                <p><span>Estado:</span> {user.state}</p>
                <p><span>Cidade:</span> {user.city}</p>
                <h1>Conta</h1>
                <p><span>Código:</span> {account.code}</p>
                <p><span>Saldo:</span> {`R$ ${account.money}`}</p>
                <p><span>Crédito:</span> {`R$ ${account.credit}`}</p>
                <p><span>Total:</span> {`R$ ${account.money + account.credit}`}</p>
                <Link className='back' data-testid='back' to='/users'><IoChevronBackOutline/> Voltar</Link>
                <Link className='backMobile' data-testid='backMobile' to='/credits'><MdKeyboardArrowRight/> Voltar</Link>
            </div>
        }
    </div>
  )
}

export default User