import './UsersAdm.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {deleteUserAdm, filterUsersAdm, showUsersAdm} from '../../slices/userAdmSlices'
import Loader from '../../Components/Loader/Loader'
import {FaUserTie} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Filter from '../../Components/Filter/Filter'
import Warning from '../../Components/Warning/Warning'

function UsersAdm({test}) {

    const {usersAdm,loading}=useSelector((state)=>state.userAdm)
    const {auth,loading:loadingAuth}=useSelector((state)=>state.auth)
    const [showWarning,setShowWarning]=useState(false)
    const [idWarning,setIdWarning]=useState('')
    const [nameWarning,setNameWarning]=useState('')
    const dispatch=useDispatch()
     
    useEffect(()=>{
        if(!test){
            dispatch(showUsersAdm())
        }
    },[dispatch,test])

    function handleDeleteUserAdm(id){
        dispatch(deleteUserAdm({id}))
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
        <div className='usersAdmPage'>
        <Filter filter={filterUsersAdm}/>
        {loading && <Loader type={'Page'}/>}
        {loadingAuth && !loading && <Loader type={'Page'}/>}
        {showWarning && <Warning name={nameWarning} callback={handleDeleteUserAdm} action='excluir ' closeWarning={closeWarning} id={idWarning}/>}                
        <h1>Administradores</h1>
        {!loading && usersAdm && !loading && !loadingAuth &&
            <ul className='usersAdm'>
                {usersAdm && usersAdm.lenght!==0 && usersAdm.map(userAdm=>(
                    <li key={userAdm.id}>
                        <div className='userAdm'>
                            <span><FaUserTie/>{userAdm.name}</span>
                            <div>
                                <Link to={`/userAdm/${userAdm.id}`}>Ver</Link>
                                {auth.mainadmin && auth.id !== userAdm.id && !showWarning && <button onClick={()=>handleShowWarning(userAdm.name,userAdm.id)}>Excluir</button>}
                            </div>
                        </div>
                    </li>
                
                ))}
            </ul>
        }
    </div>
  )
}

export default UsersAdm