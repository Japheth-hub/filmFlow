'use client'
import { useEffect, useState } from "react";
import DashArea from "./dashArea/DashArea";
import DashBar from "./dashBar/DashBar"
import style from './DashGrap.module.scss'
import { Chart as chartJS} from 'chart.js/auto'
import { movieGenre, userDay, salesDay, revrankGenre } from './data.js';

const DashGrap = ({sid}) => {
    const { admin } = JSON.parse(window.localStorage.getItem('FilmFlowUsr'))
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
            label: "Nuevos usuarios",
            data: 'Cargando..',
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)'
        }]
    })
    const [salesXday, setSalesXday] = useState({
        labels: 'Cargando..',
        datasets: [{
            fill: true,
            label: "Ventas diarias",
            data: 'Cargando..',
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)'
        }]
    })
    const [revrankXgenre, setRevrankXgenre] = useState({
        labels: 'Cargando..',
        datasets: [{
            fill: true,
            label: "Ranking y revies por género",
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
        }).catch(error => {
            return <p>No se encontraron datos para mostrar</p>
        })

        userDay(sid).then(response => {
            setUserXday({
                ...userXday, labels: response.labels,
                datasets:[{
                    ...userXday.datasets[0],
                    data: response.data
                }]
            })
        }).catch(error => {
            return <p>No se encontraron datos para mostrar</p>
        })

        salesDay(sid).then(response => {
            console.log(response);
            setSalesXday({
                ...userXday, labels: response.labels,
                datasets:[{
                    ...userXday.datasets[0],
                    data: response.data
                }]
            })
        }).catch(error => {
            return <p>No se encontraron datos para mostrar</p>
        })
        revrankGenre().then(response => {
            console.log(response);
            // setSalesXday({
            //     ...userXday, labels: response.labels,
            //     datasets:[{
            //         ...userXday.datasets[0],
            //         data: response.data + 1
            //     }]
            // })
        }).catch(error => {
            return <p>No se encontraron datos para mostrar</p>
        })
    },[])

    return(
        <div>
            {
                admin 
                ?(<div className={style.contentGrap}>
                    <DashArea chartData={salesXday} title={'Ventas diarias'} className={style.content}/>
                    <DashBar chartData={movieXgenre} title={'Películas por género'} className={style.content}/>
                    <DashArea chartData={salesXday} title={'Ranking y reviews por género'} className={style.content}/>
                    <DashBar chartData={userXday} title={'Usuarios Creados por día'} className={style.content}/>
                </div>)
                :(<div className={style.contentGrap}>
                    <DashArea chartData={salesXday} title={'Ventas diarias'} className={style.content}/>
                    <DashBar chartData={movieXgenre} title={'Películas por género'} className={style.content}/>
                    <DashArea chartData={salesXday} title={'Ranking y reviews por género'} className={style.content}/>
                </div>)
            }
        </div>
    )
}

export default DashGrap;

/*
(OK) : Cantidad de usuarios por dia -> LineChart (Labels:fechas - data:CantUsers)ArrayEntri(user-CreateAt)
(OK) : Cantidad de peliculas por genero -> BarChart (Labels:genres - dat:CantMovies)
Ventas contra usuarios -> MultiAxisChart
Ventas por usuarios -> MultiAxisChart
*/