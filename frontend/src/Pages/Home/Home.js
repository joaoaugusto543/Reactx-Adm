import './Home.css'
import Loader from '../../Components/Loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { showUsers } from '../../slices/userSlices'
import GenreChart from '../../Components/GenreChart/GenreChart'
import StateChart from '../../Components/StateChart/StateChart'

function Home() {

  const {users,loading}=useSelector((state)=>state.user)
  const {auth,loading:loadingAuth}=useSelector((state)=>state.auth)
  const [amountOfUsers,setAmountOfUsers]=useState(0)
  const [name,setName]=useState('|')
  const dispatch=useDispatch()

  useEffect(()=>{

    //increase the number of users

    if(users && users.length!==amountOfUsers){
      setTimeout(()=>{
        setAmountOfUsers(amountOfUsers + 1)
      },100)
    }

  },[users,amountOfUsers])

  
  useEffect(()=>{

    //write the name

    if(auth.name && auth.name.length !== name.length-1 && name.indexOf('|')!==-1){

      const nameArray=auth.name.split('')

      setTimeout(() => {
        setName(name.replace('|','') + nameArray[name.length-1] + '|')
      }, 150)

    }else if(auth.name.length === name.length-1){
      setName(name.replace('|',''))
    }

  },[auth,name])


  useEffect(()=>{
    dispatch(showUsers())
  },[dispatch])
 
  return (
    <div className='homePage'>
      {loading && <Loader type='Page'/>}
      {!loading && loadingAuth && <Loader type='Page'/>}
      {!loading && !loadingAuth && users &&
        <section className='bannerHome'>
          <div className='textHome'>
            <h1 className='welcome'>Bem-vindo administrador(a) {name}</h1>
            <h1 className='amountOfUsers'>{amountOfUsers} usuários</h1>
          </div>
          <div className='charts' id='charts'>
            <GenreChart />
            <StateChart />
          </div>
        </section>
      }

    </div>
  )
}

export default Home