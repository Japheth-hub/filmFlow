'use client'
import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'

export default function layout({children}) {
  return (
    <div>  
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}
