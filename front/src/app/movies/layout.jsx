'use client'
import React from 'react'
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'
import GoBack from '@/components/goBack/GoBack'

export default function layout({children}) {
  return (
    <>
      <Navbar />
      <div className="wrapper">  
          {children}
      </div>
      <Footer />
    </>
  )
}
