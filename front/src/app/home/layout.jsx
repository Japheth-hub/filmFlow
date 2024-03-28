'use client'
import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import { Provider } from 'react-redux'

export default function layout({children}) {
  return (
<<<<<<< HEAD
    <div>
      <Provider>
        
=======
    <>  
>>>>>>> cc4d357b8cade6561af20e31a13ade287cda1f22
      <Navbar />
      <div className="wrapper">
        {children}
      </div>
      <Footer />
<<<<<<< HEAD
      </Provider>
    </div>
=======
    </>
>>>>>>> cc4d357b8cade6561af20e31a13ade287cda1f22
  )
}
