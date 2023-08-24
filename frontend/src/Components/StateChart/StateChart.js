import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {Chart} from 'react-google-charts'
import useShowStates from '../../Hooks/useShowStates'

function StateChart() {

    const {users}=useSelector((state)=>state.user)
    const states=useShowStates()
    const [chartData,setChartData]=useState([])
    
    const checkNumberOfUsersInState= useCallback(()=>{
        const data=[]

        for(let i=0;i<states.length;i++){
            const usersFilter=users.filter((user)=>user.state===states[i].uf)
            if(usersFilter.length===0){
                continue
            }
            const array=[states[i].uf,usersFilter.length]
            data.push(array)
        }

        setChartData([['Task', 'Hours per Day'],...data])

    },[states,users])

    useEffect(()=>{
        if(users && states){
            checkNumberOfUsersInState()
        }
    },[users,states,checkNumberOfUsersInState])
    
    const options = {
        title: 'Gráfico de estados',
        is3D: true
    }
 
    return (
        <>
            { users && states && <Chart chartType='PieChart' data={chartData} options={options} width={'500px'} height={'300px'}/>}
        </>      
    )
}

export default StateChart