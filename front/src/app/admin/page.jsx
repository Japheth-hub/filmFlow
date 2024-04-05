'use client'
import React,  {useEffect, useState} from 'react'
import Dashboard from '@/components/dashboard/dashboard'
import axios from 'axios'
import { useUser } from '@auth0/nextjs-auth0/client'
import style from './admin.module.scss'
import Image from 'next/image'
import burgerMenu from '@/img/burger-menu.png'
import DashGrap from '@/components/dashGrap/DashGrap'

function Admin() {
  const URL = process.env.NEXT_PUBLIC_URL
  const {user, isLoading, error} = useUser()
  const [datos, setDatos] = useState([])
  const [component, setComponent] = useState(0)

  const showMovies = async() => {
    const { data } = await axios.get(`${URL}dashboard/${user.sid}`)
    const clearData = data.movies.map((movie)=>{
      return {
        id: movie.id,
        name: movie.name,
        duration: movie.duration,
        status: movie.status,
        userId: movie.userId,
        price: movie.price,
        genre: movie.genres.map((genero) => genero.name).join("/")
      }
    })
    setDatos(clearData)
    setComponent(2)
  }
  
  const showUsers = async() => {
    const { data } = await axios.get(`${URL}dashboard/${user.sid}`)
    const clearData = data.users.map((user) => {
      return {
        name: user.name,
        email: user.email,
        role: user.roleId,
        sid: user.sid,
        created: user.createdAt.slice(0, 10),
        deleted: user.deletedAt ? user.deletedAt.slice(0, 10) : ""
      }
    })
    setDatos(clearData)
    setComponent(3)
  }

  const showPurchases = async() => {
    const { data } = await axios.get(`${URL}dashboard/${user.sid}`)
    const clearData = data.purchases.map((purch) => {
      return {
        id: purch.id,
        stripeId: purch.stripeId,
        status: purch.status,
        method: purch.method,
        currency: purch.currency,
        amount: purch.amount,
        userId: purch.userId,
        createdAt: purch.createdAt.slice(0, 10)
      }
    })
    setDatos(clearData)
    setComponent(4)
  }

  if(error){
    return (
      <div>Error con auth0</div>
    )
  }

  const renderSwitch = () => {
    switch(component){
      case 0:
        return <span className={style.welcome}>Bienvenido a tu Dashboard</span>;
      case 1:
        return <DashGrap sid={user.sid}/>;
      case 2:
        return <Dashboard datos={datos} link={`${URL}movies/`}/>;
      case 3:
        return <Dashboard datos={datos} link={`${URL}users/`}/>;
      case 4:
        return <Dashboard datos={datos} link={`${URL}purchases/`}/>;
      default:
          return <p>Selecciona una opción del menú</p>
    }
  }

  if(user){
    return (
    <div>
    <div className={style.pos}>
        <div className={style.menu}>
        <Image
          src={burgerMenu}
          width={25}
          height={25}
          alt="menu"
        />
          <div className={style.menuText}>
            <div onClick={() => setComponent(1)}><p>Gráficos</p></div>
            <div onClick={() => showMovies()}><p>Películas</p></div>
            <div onClick={() => showUsers()}><p>Usuarios</p></div>
            <div onClick={() => showPurchases(4)}><p>Ventas</p></div>
            <div onClick={() => setComponent()}><p>Promos</p></div>
          </div>
        </div>
        <div className={style.content}>

            {
              renderSwitch()
            }
        
        </div>
    </div>
    </div>
    )
  }
}

export default Admin