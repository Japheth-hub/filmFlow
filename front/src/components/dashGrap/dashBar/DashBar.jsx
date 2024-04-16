import React from "react";
import {Bar} from "react-chartjs-2";
import style from "../DashGrap.module.scss"

export default function DashArea({chartData}) {
    const options = {
        responsive: true,
    }
    return (
        <div className={style.grap}><Bar options={options} data={chartData}/></div>
    );
}