'use client'
import { useEffect, useState } from "react";
import DashArea from "./dashArea/DashArea";
import DashBar from "./dashBar/DashBar"
import { Chart as chartJS} from 'chart.js/auto'
import { movieGenre, userDay } from './data.js';

const DashGrap = ({sid}) => {
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
    const [userXday, setUserXday] = useState({
        labels: 'Cargando..',
        datasets: [{
            fill: true,
            label: "Nuevo usuario",
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
        userDay(sid).then(response =>{
            console.log(response);
            setUserXday({
                ...userXday, labels: Object.keys(response),
                datasets:[{
                    ...userXday.datasets[0],
                    data: response.map(elem => {elem.map(cant => cant.length)})
                }]
            })
        })
    },[])

    return(
        <div>
            <DashBar chartData={userXday}/>
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