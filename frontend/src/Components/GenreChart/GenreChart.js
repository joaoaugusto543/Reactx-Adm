import React from 'react'
import { useSelector } from 'react-redux'
import {Chart} from 'react-google-charts'

function GenreChart() {

    const {users}=useSelector((state)=>state.user)

    console.log(users)

    const data = [
        ['Gender', 'Gender of users'],
        ['Masculino', users.length !==0 && users ? (users.filter(userAdm=>userAdm.gender==='Masculino')).length : 0],
        ['Feminino', users.length !==0 && users ? (users.filter(userAdm=>userAdm.gender==='Feminino')).length : 0],
        ['Outro', users.length !==0 && users ? (users.filter(userAdm=>userAdm.gender==='Outro')).length : 0],
    ]

    const options = {
        title: 'Gráfico de gêneros',
        is3D: true
    }

    return (
        <Chart chartType='PieChart' data={data} options={options} width={'500px'} height={'300px'}/>
    )
}

export default GenreChart