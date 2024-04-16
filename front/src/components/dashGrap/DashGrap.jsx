'use client'
import { useEffect, useState } from "react";
import DashArea from "./dashArea/DashArea";
import DashBar from "./dashBar/DashBar"
import style from './DashGrap.module.scss'
import { Chart as chartJS} from 'chart.js/auto'
import { movieGenre, userDay, salesDay, revrankGenre, totalSalesMonth, 
    totalMoviesDay, totalUsers, data } from './data.js';
import TooltipInfoGrap from "../ttInfoGrap/TooltipInfoGrap";

const DashGrap = ({sid}) => {
    const { role } = JSON.parse(window.localStorage.getItem('FilmFlowUsr'))
    const [totalMonth, setTotalMonth] = useState('')
    const [moviesDays, setMoviesDays] = useState('')
    const [totalUser, setTotalUser] = useState('')

    const [salesXday, setSalesXday] = useState({
        labels: 'Cargando..',
        datasets: [{
            fill: true,
            label: "Ventas diarias",
            data: 'Cargando..',
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgb(53, 162, 235, 0.7)' 
        }]
    })

    const [movieXgenre, setMovieXgenre] = useState({
        labels: 'Cargando..',
        datasets: [{
            label: "Cantidad de películas",
            data: 'Cargando..',
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgb(53, 162, 235, 0.7)'
        }]
    })
    
    const [revrankXgenre, setRevrankXgenre] = useState({
        labels: 'Cargando..',
        datasets: [{
            label: "Ranking y revies por género",
            data: 'Cargando..',
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgb(53, 162, 235, 0.7)'
        }]
    })

    const [userXday, setUserXday] = useState({
        labels: 'Cargando..',
        datasets: [{
            label: "Nuevos usuarios",
            data: 'Cargando..',
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgb(53, 162, 235, 0.7)'
        }]
    })

    useEffect(() => {
        //*VENTAS DIARIAS
        salesDay(sid).then(response => {
            setSalesXday({
                ...userXday, labels: response[[0]],
                datasets:[{
                    ...userXday.datasets[0],
                    data: response[[1]]
                }]
            })
        }).catch(error => {return <p>No se encontraron datos para mostrar</p>})
        //*TOTAL VENTAS DIARIAS
        setTotalMonth(totalSalesMonth(sid))

        //*MOVIES X GENRES
        movieGenre(sid).then(response => {
            setMovieXgenre({
                ...movieXgenre, 
                labels:response[[0]],
                datasets:[{
                    ...movieXgenre.datasets[0],
                    data: response[[1]]}]})
        }).catch(error => {return <p>No se encontraron datos para mostrar</p>})
        //*TOTAL MOVIES DIARIAS
        setMoviesDays(totalMoviesDay(sid))

        //*RANKINGS Y REVIEWS
        revrankGenre().then(response => {
            // setSalesXday({
            //     ...userXday, labels: response.labels,
            //     datasets:[{
            //         ...userXday.datasets[0],
            //         data: response.data + 1
            //     }]
            // })
        }).catch(error => {return <p>No se encontraron datos para mostrar</p>})
        //*INTERACTIONS


        //*USER X DAYS
        userDay(sid).then(response => {
            setUserXday({
                ...userXday, labels: response.labels,
                datasets:[{
                    ...userXday.datasets[0],
                    data: response.data
                }]
            })
        }).catch(error => {return <p>No se encontraron datos para mostrar</p>})
        //*TOTAL USERS
        setTotalUser(totalUsers(sid))
        
        
    },[])

    return(
        <div>
            {
                role 
                ?(<div className={style.contentGrap}>
        {/* GRAPHIC */}
                    <div className={style.card}>
                        <h3>Ventas diarias</h3>
                        <TooltipInfoGrap content={data.purchaseDay}/>
                        <DashArea chartData={salesXday}/>
                    </div>
                    <div className={style.card}>
                        <h5>Ventas mensuales</h5>
                        <TooltipInfoGrap content={data.purchaseMonth}/>
                        <h2>${totalMonth}</h2>
                    </div>
                    <div className={style.label}>
                        <h3>Ventas</h3>
                    </div>
                    <div className={style.label}>
                        <h3>Películas</h3>
                    </div>
                    <div className={style.card}>
                        <h5>Peliculas agregadas hoy</h5>
                        <TooltipInfoGrap content={data.moviesToday}/>
                        <h2>{moviesDays}</h2>
                    </div>
        {/* GRAPHIC */}
                    <div className={style.card}>
                        <h3>Películas por género</h3>
                        <TooltipInfoGrap content={data.moviesByGenre}/>
                        <DashBar chartData={movieXgenre}/>
                    </div>
                    {/* <div className={style.card}>
                        <h5>Cantidad de interacciones</h5>
                        <TooltipInfoGrap content={data.interactions}/>
                        <h2>{totalUser}</h2>
                    </div>
        GRAPHIC 
                    <div className={style.card}>
                        <h3>Ranking y reviews por género</h3>
                        <TooltipInfoGrap content={data.rankingAndReviews}/>
                        <DashArea chartData={salesXday}/>
                    </div>
                    <div className={style.label}>
                        <h3>Rankings y comentarios</h3>
                    </div> */}
        {/* GRAPHIC */}
                    <div className={style.card}>
                        <h5>Usuarios totales</h5>
                        <TooltipInfoGrap content={data.totalUsers}/>
                        <h2>{totalUser}</h2>
                    </div>
                    <div className={style.card}>
                        <h3>Usuarios Creados por día</h3>
                        <TooltipInfoGrap content={data.usersByDay}/>
                        <DashBar chartData={userXday}/>
                    </div>
                    <div className={style.label}>
                        <h3>Usuarios</h3>
                    </div>
                </div>)
                :(<div className={style.contentGrap}>
                    <h2>No tiene privilegios suficientes para ver esta sección</h2>
                </div>)
            }
        </div>
    )
}

export default DashGrap;