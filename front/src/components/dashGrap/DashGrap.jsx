'use client'
import { useEffect, useState } from "react";
import DashArea from "./dashArea/DashArea";
import DashBar from "./dashBar/DashBar"
import { Chart as chartJS} from 'chart.js/auto'
import { data, movieGenre, userWeek } from './data.js';

const DashGrap = () => {
    const [movieXgenre, setMovieXgenre] = useState({
        labels: 'Cargando..',
        datasets: [{
            fill: true,
            label: "Peliculas por género",
            data: 'Cargando..',
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)'
        }]
    })
    const [userXweek, setUserXweek] = useState({
        labels: 'Cargando..',
        datasets: [{
            fill: true,
            label: "Peliculas por género",
            data: 'Cargando..',
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)'
        }]
    })
    useEffect(() => {
        movieGenre().then(response => {
            setMovieXgenre({
                ...movieXgenre, 
                labels:response.map(elem => elem.name), 
                datasets:[{
                    ...movieXgenre.datasets[0],
                    data: response.map(elem => elem.cant)}]})
        })

    },[])
    userWeek()
    return(
        <div>
            <DashArea chartData={movieXgenre}/>
            <DashBar chartData={movieXgenre} title={'Películas por género'}/>
        </div>
    )
}

export default DashGrap;

/*
Cantidad de usuarios por semana -> LineChart (Labels:fechas - data:CantUsers)ArrayEntri(user-CreateAt)
(OK) : Cantidad de peliculas por genero -> BarChart (Labels:genres - dat:CantMovies)
Ventas contra usuarios -> MultiAxisChart
Ventas por usuarios -> MultiAxisChart
*/