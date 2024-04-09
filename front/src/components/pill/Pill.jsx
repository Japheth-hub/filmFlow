import React from 'react'
import style from './Pill.module.scss'

export default function Pill({label,callback,emoji,selected}) {
  return (
    <div className={`${style.pill} ${selected ? style.selected : ''}`} onClick={callback}>
        {emoji}{` `}{label}
    </div>
  )
}
