import React from 'react'
import style from '../button/Button.module.scss'

export default function Button({callback,emoji,label}) {
  return (
    <button className={style.button} onClick={callback}>
        {emoji}{` `}{label}
    </button>
  )
}
