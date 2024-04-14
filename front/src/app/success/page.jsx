import React from 'react'
import './success.css'

export default function success() {
  return (
    <div className='success'>
        <span className='successIcon'>🎉</span>
        <p className='successTitle'>Gracias por tu compra</p>
        <a href="/account">Volver al inicio</a>
    </div>
  )
}
