import './Users.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../Components/Loader/Loader'
import {FaUser} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { filterUsers, showUsers } from '../../slices/userSlices'
import { createUserBanned } from '../../slices/usersBannedSlices'
import Filter from '../../Components/Filter/Filter'
import Warning from '../../Components/Warning/Warning'

function Users({test}) {

    const {users:usersRedux,loading}=useSelector((state)=>state.user)
    const {loading:loadingUserBanned}=useSelector((state)=>state.userBanned)
    const [showWarning,setShowWarning]=useState(false)
    const [idWarning,setIdWarning]=useState('')
    const [nameWarning,setNameWarning]=useState('')
    const [users,setUsers]=useState([])

    const dispatch=useDispatch()

    useEffect(()=>{
        if(usersRedux){
            setUsers(usersRedux)
        }
    },[usersRedux])
     
    useEffect(()=>{
        if(!test){
            dispatch(showUsers())
        }
    },[dispatch,test])

    function handleBanUser(id){
        dispatch(createUserBanned({id}))
        setUsers(users.filter(user=>user.id !== id))
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
    <div className='usersPage'>
        <Filter filter={filterUsers}/>
        {loading && <Loader type={'Page'}/>} 
        {!loading && loadingUserBanned && <Loader type={'Page'}/>}
        {showWarning && <Warning name={nameWarning} callback={handleBanUser} action='banir ' closeWarning={closeWarning} id={idWarning}/>}                       
        <h1>Usuários</h1>
        {!loading && users &&
            <ul className='users'>
                {usersRedux.lenght!==0 && users && users.lenght!==0 && users.map(user=>(
                    <li key={user.id}>
                        <div className='user'>
                            <span><FaUser/>{user.name}</span>
                            <div>
                                <Link to={`/user/${user.id}`}>Ver</Link>
                                {!showWarning && <button onClick={()=>handleShowWarning(user.name,user.id)}>Banir</button>}
                            </div>
                        </div>
                    </li>
                
                ))}
            </ul>
        }
    </div>
  )
}

export default Users