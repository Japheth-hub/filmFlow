"use client";
import React, { useEffect } from "react";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import style from './account.module.scss'
import Button from "@/components/button/Button";
import { useState } from "react";
import axios from 'axios'
import Modal from "./modal"
import Loading from '@/components/loading/loading'

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;

const Account = () =>  {
  const { error, isLoading, user } = useUser();
  const [movies, setMovies] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userLocalStorage,setUserLocalStorage] = useState({});

  async function fetchData(){
    try {
      const { data } = await axios(`${NEXT_PUBLIC_URL}purchases/${user.sid}`);
      if(typeof data === "object"){
        setMovies(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {  
    setUserLocalStorage(window.localStorage.getItem('FilmFlowUsr') 
      ? JSON.parse(window.localStorage.getItem('FilmFlowUsr'))
      : null);
  }, [])
  
  if (error) {
    return <div>Error en su session</div>;
  }

  if (isLoading) {
    return (
      <div>
        <Loading></Loading>
      </div>
    );
  }

  return (
    <div className={style["contenedor"]}>
      <div>
        <div className={style["info"]}>
          <div className={style["datos"]}>
            <img src={user.picture} alt={user.name} />
            <p>{user.email}</p> 
            {userLocalStorage && userLocalStorage.role === "producer" ? <p>🎬</p> : null}
          </div>
          <ul>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
          {userLocalStorage && userLocalStorage.role === "viewer" ? <Button emoji={'🎬'} color={'purple'} label={"Convertirse en Producer"} callback={openModal}></Button> : null}
        </ul>
        </div>
        <div className={style["movies"]}>
          <h3>Tus Peliculas Compradas</h3>
          <div className={style["lista"]}>
            {movies.length > 0 ? movies.map((movie) => (
              <Link key={movie.id} href={`/detail/${movie.id}`}>
                <div className={style["movie"]}>
                  <img src={movie.poster} alt={movie.name} />
                  <p>{movie.name}</p>
                </div>
              </Link>
            )) : <h3 className={style['sinCompras']}>Aun no tienes Peliculas para ver</h3>
            
          }
          </div>
        </div>
        {userLocalStorage && userLocalStorage.role === "producer" 
        ? <div className={style["movies"]} >
          <h3>Tus Peliculas</h3>
          <div className={style["lista"]}>
            {movies.length > 0 ? movies.map((movie) => (
              <Link key={movie.id} href={`/detail/${movie.id}`}>
                <div className={style["movie"]}>
                  <img src={movie.poster} alt={movie.name} />
                  <p>{movie.name}</p>
                </div>
              </Link>
            )) : <h3 className={style['sinCompras']}>Aun no tienes Peliculas para ver</h3>
            
          }
          </div>
        </div> 
        : null }
      </div>
    </div>
  );
}

export default withPageAuthRequired(Account) 