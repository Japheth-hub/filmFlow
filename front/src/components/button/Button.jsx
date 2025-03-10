import React from 'react'
import style from '../button/Button.module.scss'

export default function Button({callback,emoji,label,color}) {
  return (
    <button className={`${style.button} ${style[color]}`} onClick={callback}>
        {emoji}{` `}{label}
    </button>
  )
}
