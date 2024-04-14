"use client";
import React, { useEffect } from "react";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import style from './account.module.scss'
import Button from "@/components/button/Button";
import logo from '../../img/logo-white-expanded.png'
import { useState } from "react";
import axios from 'axios'
import Modal from "./modal"
import Loading from '@/components/loading/loading'
import CheckRole from '@/components/checkRole/checkRole'

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;


const Account = () =>  {
  const { error, isLoading, user } = useUser();
  const [movies, setMovies] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRole, setUserRole] = useState('')
  let userAux = user

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get(`${NEXT_PUBLIC_URL}users/1111`);
        const userData = response.data;
        const userSid = userAux.sid

        userAux = userData.find(user => user.sid === userSid);

        if (userAux) {
          setUserRole(userAux.roleName);
        } else {
          console.error("User not found");
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
  fetchUserRole();
}, []);


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

  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(()=>{
    fetchData()
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
    <CheckRole userRole={userRole} requiredRoles={["viewer","producer","admin"]}>
    <div className={style["contenedor"]}>
      <div>
        <div className={style["info"]}>
          <div className={style["datos"]}>
            <img src={user.picture} alt={user.name} />
            <p>{user.email}</p>
          </div>
          <ul>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
          <button className="custom-button" onClick={openModal}>Formulario de Producer</button>
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
    </CheckRole>
  );
}

export default withPageAuthRequired(Account) 