"use client";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import style from './account.module.scss'
import Button from "@/components/button/Button";
import logo from '../../img/logo-white-expanded.png'
import { useState } from "react";
import axios from 'axios'
const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;

export default function Account() {
  const { error, isLoading, user } = useUser();
  const [movies, setMovies] = useState([])
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
  if(!isLoading && movies.length === 0){
    fetchData()
  }
  
  if (error) {
    return <div>Error en su session</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className={style["contenedor"]}>
      <div>
        <div className={style["info"]}>
          <div className={style["datos"]}>
            <img src={user.picture} alt={user.name} />
            <p>{user.email}</p>
          </div>
          <ul>
            <li>
              Direccion : <i>Tehuacan Puebla Mexico</i>
            </li>
            <li>
              Numero de Cuenta : <i>216535546</i>
            </li>
            <li>
              Mas detalles : <i>231587556</i>
            </li>
          </ul>
        </div>
        <div className={style["movies"]}>
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
      </div>
    </div>
  );
}
