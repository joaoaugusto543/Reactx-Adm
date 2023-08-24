import './App.css'
import {Routes,Route, Navigate} from 'react-router-dom'
import Home from './Pages/Home/Home';
import NavBar from './Components/NavBar/NavBar';
import Login from './Pages/Login/Login';
import { useSelector } from 'react-redux';
import Loader from './Components/Loader/Loader';
import UsersAdm from './Pages/UsersAdm/UsersAdm';
import Profile from './Pages/Profile/Profile';
import UserAdm from './Pages/UserAdm/UserAdm';
import CreateUserAdm from './Pages/CreateUserAdm/CreateUserAdm';
import Users from './Pages/Users/Users';
import UsersWaiting from './Pages/UsersWaiting/UsersWaiting';
import UserWaiting from './Pages/UserWaiting/UserWaiting';
import User from './Pages/User/User';
import UsersBanned from './Pages/UsersBanned/UsersBanned';
import UserBanned from './Pages/UserBanned/UserBanned';
import Security from './Pages/Security/Security';
import Credits from './Pages/Credits/Credits';
import Credit from './Pages/Credit/Credit';
import ForgotYourPassword from './Pages/ForgotYourPassword/ForgotYourPassword';
import NotFound from './Pages/NotFound/NotFound';

function App() {
  
  const {auth,loading}=useSelector((state)=>state.auth)

  if(loading){
    return <Loader/>
  }

  return (
    <>
      { auth && <NavBar/>}
      <Routes>
        <Route path='/' element={auth ? <Home/> : <Navigate to='/login'/>}/>
        <Route path='/login' element={!auth ? <Login/> : <Navigate to='/'/>}/>
        <Route path='/usersAdm' element={auth ? <UsersAdm/> : <Navigate to='/login'/>}/>
        <Route path='/users' element={auth ? <Users/> : <Navigate to='/login'/>}/>
        <Route path='/user/:id' element={auth ? <User/> : <Navigate to='/login'/>}/>
        <Route path='/usersWaiting' element={auth ? <UsersWaiting/> : <Navigate to='/login'/>}/>
        <Route path='/profile' element={auth ? <Profile/> : <Navigate to='/login'/>}/>
        <Route path='/userAdm/:id' element={auth ? <UserAdm/> : <Navigate to='/login'/>}/>
        <Route path='/userWaiting/:id' element={auth ? <UserWaiting/> : <Navigate to='/login'/>}/>
        <Route path='/usersbanned' element={auth ? <UsersBanned/> : <Navigate to='/login'/>}/>
        <Route path='/userbanned/:id' element={auth ? <UserBanned/> : <Navigate to='/login'/>}/>
        <Route path='/register' element={auth ? <CreateUserAdm/> : <Navigate to='/login'/>}/>
        <Route path='/security' element={auth ? <Security/> : <Navigate to='/login'/>}/>
        <Route path='/credits' element={auth ? <Credits/> : <Navigate to='/login'/>}/>
        <Route path='/credit/:id' element={auth ? <Credit/> : <Navigate to='/login'/>}/>
        <Route path='/forgotyourpassword' element={!auth ? <ForgotYourPassword/> : <Navigate to='/'/>}/>
        <Route path='*' element={auth ? <NotFound/> : <Navigate to='/login'/>}/>
      </Routes>
    </>
  );
}

export default App;



