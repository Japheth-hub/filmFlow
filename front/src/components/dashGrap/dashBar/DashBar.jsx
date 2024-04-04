import React from "react";
import style from '../DashGrap.module.scss';
import {Bar} from "react-chartjs-2";

export default function DashArea({chartData, title}) {
    return (
        <div>
            <h3>{title}</h3>
            <div className={style.content}><Bar data={chartData} /></div>
        </div>
    );
}