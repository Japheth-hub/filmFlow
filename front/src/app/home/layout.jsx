'use client'
import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import { Provider } from 'react-redux'

export default function layout({children}) {
  return (
    <div>
      <Provider>
        
      <Navbar />
      <div className="wrapper">
        {children}
      </div>
      <Footer />
      </Provider>
    </div>
  )
}
