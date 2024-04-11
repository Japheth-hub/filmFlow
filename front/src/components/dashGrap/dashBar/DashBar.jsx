import React from "react";
import style from '../DashGrap.module.scss';
import Image from 'next/image'
import info from '@/img/tooltip-info.svg'
import {Bar} from "react-chartjs-2";

export default function DashArea({chartData, title}) {
    return (
        <div className={style.content}>
            <h3>{title}</h3>
            <div className={style.tooltip}>
                <span className={style.tooltiptext}>Esto es un tooltip</span>
            <Image
                src={info}
                width={25}
                height={25}
                alt="info"/>
            </div>
            <div className={style.card}><Bar data={chartData}/></div>
        </div>
    );
}