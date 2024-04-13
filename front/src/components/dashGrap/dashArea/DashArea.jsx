import React from "react";
import {Line} from "react-chartjs-2";
import style from "../DashGrap.module.scss"

export default function DashArea({chartData}) {
    const options = {
        responsive: true
    }
    return ( 
        <div className={style.grap}><Line options={options} data={chartData} /></div>
    );
}