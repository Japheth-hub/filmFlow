'use client'
import { useEffect, useState } from "react";
import DashGrap from "../../components/dashGrap/DashGrap";
import { Chart as chartJS} from 'chart.js/auto'

const Dashboard = () => {
    
    return(
        <div>
            <DashGrap />
        </div>
    )
}

export default Dashboard;

/*
Cantidad de usuarios por semana -> LineChart (Labels:fechas - data:CantUsers)ArrayEntri(user-CreateAt)
(OK) : Cantidad de peliculas por genero -> BarChart (Labels:genres - dat:CantMovies)
Ventas contra usuarios -> MultiAxisChart
Ventas por usuarios -> MultiAxisChart
*/