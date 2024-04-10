'use client'
import React,  {useEffect, useState} from 'react'
import Dashboard from '@/components/dashboard/dashboard'
import axios from 'axios'
import { useUser } from '@auth0/nextjs-auth0/client'
import style from './admin.module.scss'
import Image from 'next/image'
import burgerMenu from '@/img/burger-menu.png'
import DashGrap from '@/components/dashGrap/DashGrap'
import Loading from "@/components/loading/loading";

function Admin() {
  const URL = process.env.NEXT_PUBLIC_URL
  const {user, isLoading, error} = useUser()
  const [datos, setDatos] = useState([])
  const [component, setComponent] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const showMovies = async() => {
    try {
      const { data } = await axios.get(`${URL}movies`);
      const clearData = data.map((movie) => {
        return {
          id: movie.id,
          name: movie.name,
          duration: movie.duration,
          status: movie.status,
          userId: movie.userId,
          price: movie.price,
          genre: movie.genres.map((genero) => genero.name).join("/"),
        };
      });
      setDatos(clearData);
      setComponent(2);
    } catch (error) {
      console.log(error)
    }
  }
  
  const showUsers = async () => {
    try {
      const { data } = await axios.get(`${URL}users/${user.sid}`)
      const clearData = data.map((user) => {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.roleName,
          sid: user.sid,
          created: user.createdAt.slice(0, 10),
          deleted: user.deletedAt ? user.deletedAt.slice(0, 10) : ""
        }
      })
      setDatos(clearData)
      setComponent(3)
    } catch (error) {
      console.log('Error en la función showUsers de admin/page.jsx', error)
    }
  }

  const showPurchases = async() => {
    const { data } = await axios.get(`${URL}purchases/${user.sid}`)
    const clearData = data.map((purch) => {
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
        return <Dashboard datos={datos} title={`Movies`} link={`${URL}movies/`} sid={user.sid}/>;
      case 3:
        return <Dashboard datos={datos} title={'Users'} link={`${URL}users/`} sid={user.sid}/>;
      case 4:
        return <Dashboard datos={datos} title={`Purchases`} link={`${URL}purchases/`} sid={user.sid}/>;
      case 5:
        return <Dashboard datos={datos} title={`Reviews`} link={`${URL}reviews/`} sid={user.sid}/>;
      default:
          return <p>Selecciona una opción del menú</p>
    }
  }

  if (isLoading) {
    return <Loading></Loading>
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
            <div onClick={() => setComponent(1)}><a role="img" aria-label="Gráficos">📈</a><span>Gráficos</span></div>
            <div onClick={() => showMovies()}><a role="img" aria-label="Películas">🎬</a><span>Películas</span></div>
            <div onClick={() => showUsers()}><a role="img" aria-label="Usuarios">👤</a><span>Usuarios</span></div>
            <div onClick={() => showReviews()}><a role="img" aria-label="Reviews">⭐</a><span>Reviews</span></div>
            <div onClick={() => showPurchases()}><a role="img" aria-label="Ventas">💰</a><span>Ventas</span></div>
            <div onClick={() => setComponent()}><a role="img" aria-label="Promos">🤩</a><span>Promos</span></div>
          </div>
        </div>
        <div className={style.content}>
            <br />
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