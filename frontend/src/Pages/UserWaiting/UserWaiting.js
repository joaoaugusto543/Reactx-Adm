import './UserWaiting.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, useParams} from 'react-router-dom'
import Loader from '../../Components/Loader/Loader'
import {IoChevronBackOutline} from 'react-icons/io5' 
import { getUserWaitingById } from '../../slices/userWaitingSlices'
import {MdKeyboardArrowRight} from 'react-icons/md'

function UserWaiting({test}) {

  const {id}=useParams()
  const {userWaiting,loading}=useSelector((state)=>state.userWaiting)
  const dispatch=useDispatch()

  useEffect(()=>{
    if(!test){
      dispatch(getUserWaitingById({id}))
    }
  },[dispatch,id,test])
 
  return (
    <div className='userWaitingPage'>
        {loading && <Loader type={'Page'}/>}
        {userWaiting && !loading &&
            <div className='userWaitingProfile'>
                <h1>{userWaiting.name}</h1>
                <p><span>E-mail:</span> {userWaiting.email}</p>
                <p><span>Gênero:</span> {userWaiting.gender}</p>
                <p><span>Data de nascimento:</span> {userWaiting.birthday}</p>
                <p><span>Telefone:</span> {userWaiting.phone}</p>
                <p><span>CPF:</span> {userWaiting.cpf}</p>
                <p><span>RG:</span> {userWaiting.rg}</p>
                <p><span>Estado:</span> {userWaiting.state}</p>
                <p><span>Cidade:</span> {userWaiting.city}</p>
                <Link className='back' data-testid='back' to='/usersWaiting'><IoChevronBackOutline/> Voltar</Link>
                <Link className='backMobile' data-testid='backMobile' to='/usersWaiting'><MdKeyboardArrowRight/> Voltar</Link>
            </div>
        }
    </div>
  )
}

export default UserWaiting