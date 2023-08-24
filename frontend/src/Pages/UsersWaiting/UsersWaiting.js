import './UsersWaiting.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../Components/Loader/Loader'
import {FaUserClock} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { deleteUserWaiting, filterUsersWaiting, showUsersWaiting } from '../../slices/userWaitingSlices'
import { createUser } from '../../slices/userSlices'
import Filter from '../../Components/Filter/Filter'
import Warning from '../../Components/Warning/Warning'

function UsersWaiting({test}) {

    const {usersWaiting:usersWaitingRedux,loading}=useSelector((state)=>state.userWaiting)
    const {loading:loadingUser}=useSelector((state)=>state.user)
    const [usersWaiting,setUsersWaiting]=useState(false)
    const [showWarningAuthorization,setShowWarningAuthorization]=useState(false)
    const [showWarningDenial,setShowWarningDenial]=useState(false)
    const [idWarning,setIdWarning]=useState('')
    const [nameWarning,setNameWarning]=useState('')
    const [userWaitingWarning,setUserWaitingWarning]=useState({})

    const dispatch=useDispatch()

    useEffect(()=>{
        if(usersWaitingRedux){
            setUsersWaiting(usersWaitingRedux)
        }
    },[usersWaitingRedux])
     
    useEffect(()=>{
        if(!test){
            dispatch(showUsersWaiting())
        }
    },[dispatch,test])

    function handleCreateUser(userWaiting){

        const {id,cpf,email,phone,rg}=userWaiting

        dispatch(createUser({id,cpf,email,phone,rg}))

        setUsersWaiting(usersWaiting.filter(userWaiting=>userWaiting.id!==id))

    }

    function handleDeleteUserWaiting(id){
        dispatch(deleteUserWaiting({id}))
        setUsersWaiting(usersWaiting.filter(userWaiting=>userWaiting.id!==id))
    }

    function handleShowWarningAuthorization(userWaiting){
        setShowWarningAuthorization(true)
        setIdWarning(userWaiting.id)
        setNameWarning(userWaiting.name)
        setUserWaitingWarning(userWaiting)
    }

    function closeWarningAuthorization(){
        setShowWarningAuthorization(false)
    }

    function handleShowWarningDenial(name,id){
        setShowWarningDenial(true)
        setIdWarning(id)
        setNameWarning(name)
    }

    function closeWarningDenial(){
        setShowWarningDenial(false)
    }

    return (
        <div className='usersWaitingPage'>
            {loading && <Loader type={'Page'}/>}
            {loadingUser && !loading && <Loader type={'Page'}/>}
            {showWarningAuthorization && <Warning name={nameWarning} callback={handleCreateUser} action='autorizar ' closeWarning={closeWarningAuthorization} id={idWarning} user={userWaitingWarning}/>}                
            {showWarningDenial && <Warning name={nameWarning} callback={handleDeleteUserWaiting} action='negar ' closeWarning={closeWarningDenial} id={idWarning}/>}
            <Filter filter={filterUsersWaiting}/>        
            <h1 className='title'>Usuários esperando</h1>
            {!loading && usersWaitingRedux &&
                <ul className='usersWaiting'>
                    {usersWaiting && usersWaiting.lenght!==0 && usersWaiting.map(userWaiting=>(
                        <li key={userWaiting.id}>
                            <div className='userWaiting'>
                                <span><FaUserClock/>{userWaiting.name}</span>
                                <div>
                                    <Link to={`/userWaiting/${userWaiting.id}`}>Ver</Link>
                                    {!showWarningAuthorization && !showWarningDenial &&
                                        <>
                                            <button onClick={()=>handleShowWarningAuthorization(userWaiting)} id='authorize'>Autorizar</button>
                                            <button onClick={()=>handleShowWarningDenial(userWaiting.name,userWaiting.id)}>Negar</button>
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

export default UsersWaiting