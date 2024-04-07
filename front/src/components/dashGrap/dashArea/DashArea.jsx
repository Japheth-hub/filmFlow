import React from "react";
import style from '../DashGrap.module.scss';
import {Line} from "react-chartjs-2";

export default function DashArea({chartData, title}) {
    return (   
            <div>
                <h3>{title}</h3>
                <div className={style.content}><Line data={chartData} /></div>
            </div>
    );
}