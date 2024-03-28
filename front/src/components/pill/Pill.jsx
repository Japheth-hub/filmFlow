import React from 'react'
import style from './Pill.module.scss'

export default function Pill({label,callback,emoji}) {
  return (
    <div className={style.pill} onClick={callback}>
        {emoji}{` `}{label}
    </div>
  )
}
