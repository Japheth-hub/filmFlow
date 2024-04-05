'use client'
import React from 'react'
import Navbar from '@/components/navbar/Navbar'
import style from './admin.module.scss'
import Link from 'next/link'

export default function layout({children}) {
  return (
    <div>
      <Navbar></Navbar>
      <div className='dashboard'>
        <div className='sidebar'>
          <h3>Graficas</h3>
          <Link href='/admin'><h3>Dashboard</h3></Link>
          <ul>
            <li><Link href='/admin/movies'>Movies</Link></li>
            <li><Link href='/admin/users'>users</Link></li>
            <li><Link href='/admin/purchases'>Purchases</Link></li>
          </ul>
        </div>
        <div className={style.tablas}>
            {children}
        </div>
      </div>
    </div>
  )
}
