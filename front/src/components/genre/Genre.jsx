import React from 'react'
import style from '../genre/Genre.module.scss'

export default function Genre({genre}) {
  return (
    <div className={style.genre}>
        <div>
          <div className={style.emoji}>{genre.emoji}</div>
          <h4 className={style.name}>{genre.label}</h4>
        </div>
    </div>
  )
}
