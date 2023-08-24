import './NavBar.css'
import { NavLink } from 'react-router-dom'
import { AiFillHome} from 'react-icons/ai'
import {CgProfile} from 'react-icons/cg'
import {BiLogOut} from 'react-icons/bi'
import {BsShieldLockFill} from 'react-icons/bs'
import {FaUserClock , FaUserSlash,FaUserTie,FaUser,FaUserPlus} from 'react-icons/fa'
import {BiMoney} from 'react-icons/bi'
import Logo from '../../imgs/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect} from 'react'
import { profile, resetSuccess } from '../../slices/userAdmSlices'
import { logout } from '../../slices/authSlices'
import {AiOutlineMenu} from 'react-icons/ai'
import Loader from '../Loader/Loader'
import closeNavBar from '../../scripts/NavBar/closeNavBar'
import openNavBar from '../../scripts/NavBar/openNavBar'
import screenSize from '../../scripts/NavBar/screenSize'
import closeNavBarClickLinks from '../../scripts/NavBar/closeNavBarClickLinks'

function NavBar({test}) {

  const {auth,loading}=useSelector((state)=>state.auth)
  const dispatch=useDispatch()
  
  
  useEffect(()=>{
    screenSize()
    closeNavBarClickLinks()
  },[])

  useEffect(()=>{
    if(!test){
      dispatch(profile())
    }
  },[dispatch,test])

  function handleLogout(){
    dispatch(resetSuccess())
    dispatch(logout())
  }

  return (
    <>
      {loading && <Loader/>}
      <button className='buttonNavBar buttonOpenNavBar' onClick={openNavBar}><AiOutlineMenu/></button>
      <button className='buttonNavBar buttonCloseNavBar' onClick={closeNavBar}><AiOutlineMenu/></button>
      <nav>
        <img className='logo' src={Logo} alt='logo' />
        <ul className='navLinks'>
          <li><NavLink className={({isActive})=>isActive ? 'active':'disabled'} to='/'><AiFillHome/>Home</NavLink></li>
          <li><NavLink className={({isActive})=>isActive ? 'active':'disabled'} to='/profile'><CgProfile/>Perfil</NavLink></li>
          {auth && auth.mainadmin && <li><NavLink className={({isActive})=>isActive ? 'active':'disabled'} to='/register'><FaUserPlus/>Criar administrador</NavLink></li>}
          <li id='userNavBar'><NavLink className={({isActive})=>isActive ? 'active':'disabled'} to='/usersAdm'><FaUserTie/>Administradores</NavLink></li>
          <li><NavLink className={({isActive})=>isActive ? 'active':'disabled'} to='/usersWaiting'><FaUserClock/>Usuários em espera</NavLink></li>
          <li id='userNavBar'><NavLink className={({isActive})=>isActive ? 'active':'disabled'} to='/users'><FaUser/>Usuários</NavLink></li>
          <li><NavLink className={({isActive})=>isActive ? 'active':'disabled'} to='/usersBanned'><FaUserSlash/>Usuários banidos</NavLink></li>
          <li><NavLink className={({isActive})=>isActive ? 'active':'disabled'} to='/credits'><BiMoney/>Pedidos de crédito</NavLink></li>
          <li><NavLink className={({isActive})=>isActive ? 'active':'disabled'} to='/security'><BsShieldLockFill/>Segurança</NavLink></li>
          <li><button className='logout' onClick={handleLogout}><BiLogOut/>Sair</button></li>

        </ul>
      </nav>
    </>
  )
}

export default NavBar