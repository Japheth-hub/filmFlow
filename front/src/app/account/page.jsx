"use client";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import style from './account.module.scss'
import Button from "@/components/button/Button";
import logo from '../../img/logo-white-expanded.png'

export default function Account() {
  const { error, isLoading, user } = useUser();

  if (error) {
    return <div>Error en su session</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(logo);
  return (
    <div className={style["container"]}>
      <div className={style["nav"]}>
        <Link href="/home">
          <Button callback emoji='🔙' label='Home'></Button>
        </Link>
        <div className={style["filmFlow"]}>
          <img src={logo.src} alt="logo-filmFlow" />
        </div>
        <p className={style["userName"]}>{user.name}</p>
      </div>
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
          <hr />
          <div className={style["movie"]}>
            <img
              src="https://www.mubis.es/media/users/12828/321885/nuevo-poster-de-the-marvels-original.jpg"
              alt="Poster"
            />
            <p>Marvels</p>
          </div>
        </div>
      </div>
    </div>
  );
}
