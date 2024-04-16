import React from 'react'
import style from './loading.module.scss'

export default function Loading() {
  return (
    <div className={style.loader}>
      Cargando
      <span></span>
    </div>
  );
}
