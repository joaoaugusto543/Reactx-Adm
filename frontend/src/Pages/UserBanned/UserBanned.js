import './UserBanned.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Loader from '../../Components/Loader/Loader'
import { IoChevronBackOutline } from 'react-icons/io5'
import { getAccountById } from '../../slices/accountsSlices'
import { getUserBannedById } from '../../slices/usersBannedSlices'
import {MdKeyboardArrowRight} from 'react-icons/md'

function UserBanned({test}) {

  const {userBanned,loading}=useSelector((state)=>state.userBanned)
  const {account,loading:loadingAccount}=useSelector((state)=>state.account)
  const dispatch=useDispatch()
  const {id}=useParams()

  useEffect(()=>{
    if(!test){
      dispatch(getUserBannedById({id}))
    }
  },[dispatch,id,test])

  useEffect(()=>{
    if(!test){
      if(userBanned){
        dispatch(getAccountById({id:userBanned.idaccount}))
      }
    }
  },[dispatch,userBanned,test])

  return (
    <div className='userBannedPage'>
        {loading && <Loader type={'Page'}/>}
        {loadingAccount && !loading && <Loader type={'Page'}/>}
        {userBanned && account && !loading && !loadingAccount &&
            <div className='userBannedProfile'>
                <h1>{userBanned.name}</h1>
                <p><span>E-mail:</span> {userBanned.email}</p>
                <p><span>Gênero:</span> {userBanned.gender}</p>
                <p><span>Data de nascimento:</span> {userBanned.birthday}</p>
                <p><span>Telefone:</span> {userBanned.phone}</p>
                <p><span>CPF:</span> {userBanned.cpf}</p>
                <p><span>RG:</span> {userBanned.rg}</p>
                <p><span>Estado:</span> {userBanned.state}</p>
                <p><span>Cidade:</span> {userBanned.city}</p>
                <h1>Conta</h1>
                <p><span>Código:</span> {account.code}</p>
                <p><span>Saldo:</span> {`R$ ${account.money}`}</p>
                <p><span>Crédito:</span> {`R$ ${account.credit}`}</p>
                <p><span>Total:</span> {`R$ ${account.money + account.credit}`}</p>
                <Link className='back' data-testid='back' to='/usersbanned'><IoChevronBackOutline/> Voltar</Link>
                <Link className='backMobile' data-testid='backMobile' to='/usersbanned'><MdKeyboardArrowRight/> Voltar</Link>
            </div>
        }
    </div>
  )
}

export default UserBanned