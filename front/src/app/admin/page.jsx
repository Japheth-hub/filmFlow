'use client'
import React,  {useState} from 'react'
import Dashboard from '@/components/dashboard/dashboard'
import { useUser } from '@auth0/nextjs-auth0/client'
import style from './admin.module.scss'
import Image from 'next/image'
import burgerMenu from '@/img/burger-menu.png'
import DashGrap from '@/components/dashGrap/DashGrap'
import Loading from "@/components/loading/loading";

function Admin() {
  const URL = process.env.NEXT_PUBLIC_URL
  const {user, isLoading, error} = useUser()
  const [component, setComponent] = useState(0)

  const showMovies = async() => {
      setComponent(2);
  }
  
  const showUsers = async() => {
      setComponent(3)
  }
  
  const showReviews = async () => {
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
        return <Dashboard title={`Movies`} link={`${URL}movies/`} sid={user.sid}/>;
      case 3:
        return <Dashboard title={'Users'} link={`${URL}users/`} sid={user.sid}/>;
      case 4:
        return <Dashboard title={`Reviews`} link={`${URL}reviews/`} sid={user.sid}/>;
        case 5:
        return <div>Aqui va el dashVentas</div>;
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