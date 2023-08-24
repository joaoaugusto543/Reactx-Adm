import { useDispatch, useSelector } from 'react-redux'
import './UsersBanned.css'
import { useEffect, useState } from 'react'
import { filterUsersBanned, showUsersBanned, unBanUserBanned } from '../../slices/usersBannedSlices'
import { FaUserSlash } from 'react-icons/fa'
import Loader from '../../Components/Loader/Loader'
import { Link } from 'react-router-dom'
import Filter from '../../Components/Filter/Filter'
import Warning from '../../Components/Warning/Warning'

function UsersBanned({test}) {
    const {usersBanned:usersBannedRedux,loading}=useSelector((state)=>state.userBanned)
    const [showWarning,setShowWarning]=useState(false)
    const [idWarning,setIdWarning]=useState('')
    const [nameWarning,setNameWarning]=useState('')
    const [usersBanned,setUsersBanned]=useState('')

    const dispatch=useDispatch()

    useEffect(()=>{
        if(usersBannedRedux){
            setUsersBanned(usersBannedRedux)
        }
    },[usersBannedRedux])
     
    useEffect(()=>{
        if(!test){
            dispatch(showUsersBanned())
        }
    },[dispatch,test])

    function handleUnbanUserBanned(id){
        dispatch(unBanUserBanned({id}))
    }

    function handleShowWarning(name,id){
        setShowWarning(true)
        setNameWarning(name)
        setIdWarning(id)
    }

    function closeWarning(){
        setShowWarning(false)
    }

  return (
    <div className='usersBannedPage'>
            {loading && <Loader type={'Page'}/>}
            {showWarning && <Warning name={nameWarning} callback={handleUnbanUserBanned} action='desbanir ' closeWarning={closeWarning} id={idWarning}/>}
            <Filter filter={filterUsersBanned}/>      
            <h1>Usuários banidos</h1>
            {!loading && usersBanned &&
                <ul className='usersBanned'>
                    {usersBanned && usersBanned.lenght!==0 && usersBanned.map(userBanned=>(
                        <li key={userBanned.id}>
                            <div className='userBanned'>
                                <span><FaUserSlash/>{userBanned.name}</span>
                                <div>
                                    <Link to={`/userbanned/${userBanned.id}`}>Ver</Link>
                                    {!showWarning && <button className='desbanir' onClick={()=>handleShowWarning(userBanned.name,userBanned.id)}>Desbanir</button>}
                                </div>
                            </div>
                        </li>
                    
                    ))}
                </ul>
            }
        </div>
  )
}

export default UsersBanned