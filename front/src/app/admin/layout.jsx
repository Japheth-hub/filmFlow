'use client'
import React from 'react'
import Navbar from '@/components/navbar/Navbar'

export default function layout({children}) {
  return (
    <div>
      <Navbar></Navbar>
        {children}
    </div>
  )
}
