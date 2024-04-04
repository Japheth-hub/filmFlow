'use client'
import React from 'react'
import Navbar from '@/components/navbar/Navbar'
import style from './admin.module.scss'

export default function layout({children}) {
  return (
    <div>
      <Navbar></Navbar>
      <div className='dashboard'>
        <div className='sidebar'>
          <h3>Graficas</h3>
        </div>
        <div className={style.tablas}>
            {children}
        </div>
      </div>
    </div>
  )
}
