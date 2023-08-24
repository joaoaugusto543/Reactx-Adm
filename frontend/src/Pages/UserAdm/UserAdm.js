import './UserAdm.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, useParams} from 'react-router-dom'
import { getUserAdmById } from '../../slices/userAdmSlices'
import Loader from '../../Components/Loader/Loader'
import {IoChevronBackOutline} from 'react-icons/io5'
import {MdKeyboardArrowRight} from 'react-icons/md' 

function UserAdm({test}) {

  const {id}=useParams()
  const {userAdm,loading}=useSelector((state)=>state.userAdm)
  const dispatch=useDispatch()

  useEffect(()=>{
    if(!test){
      dispatch(getUserAdmById({id}))
    }
  },[dispatch,id,test])
  
  return (
    <div className='userAdmPage'>
        {loading && <Loader type={'Page'}/>}
        {userAdm && !loading &&
            <div className='userAdmProfile'>
                <h1>{userAdm.name}</h1>
                <p><span>E-mail:</span> {userAdm.email}</p>
                <p><span>Gênero:</span> {userAdm.gender}</p>
                <p><span>Data de nascimento:</span> {userAdm.birthday}</p>
                <p><span>Telefone:</span> {userAdm.phone}</p>
                <p><span>CPF:</span> {userAdm.cpf}</p>
                <p><span>RG:</span> {userAdm.rg}</p>
                <p><span>Estado:</span> {userAdm.state}</p>
                <p><span>Cidade:</span> {userAdm.city}</p>
                <Link data-testid='back' className='back' to='/usersAdm'><IoChevronBackOutline/> Voltar</Link>
                <Link data-testid='backMobile' className='backMobile' to='/usersAdm'><MdKeyboardArrowRight/> Voltar</Link>
            </div>
        }
    </div>
  )
}

export default UserAdm