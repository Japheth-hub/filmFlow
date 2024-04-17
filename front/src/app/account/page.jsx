"use client";
import React, { useEffect } from "react";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import style from './account.module.scss'
import Button from "@/components/button/Button";
import { useState } from "react";
import axios from 'axios'
import Modal from "./modal"
import ModalEdit from '@/components/modal/ModalEdit'
import Loading from '@/components/loading/loading'

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;

const Account = () =>  {
  const { error, isLoading, user } = useUser();
  const [movies, setMovies] = useState([])
  const [producerMovies, setProducerMovies] = useState([])
  const [producerInfo, setProducerInfo] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userLocalStorage,setUserLocalStorage] = useState(null);
  const [previewEditOpen, setPreviewEditOpen] = useState(false); 
  const [previewMovieData, setPreviewMovieData] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {  
    if(userLocalStorage === null) {
      setUserLocalStorage(JSON.parse(window.localStorage.getItem('FilmFlowUsr')))
    }
  }, [])

  
  async function fetchData(){
    try {
      const { data } = await axios(`${NEXT_PUBLIC_URL}purchases/${user.sid}`);
      if(typeof data === "object"){
        setMovies(data)
      }
    } catch (error) {
      console.error(error)
    }
  }
  
  async function fetchProducerMovies(user) {
    try {
      const { data } = await axios.get(`${NEXT_PUBLIC_URL}movies?admin=true&userSid=${user.sid}`)
      if(typeof data === "object"){
        setProducerMovies(data)
      }
    } catch (error) {
      console.error(error.response.data.message + ' que hayas creado')
    }
  }
  
  async function fetchProducerInfo(user) {
    try {
      const { data } = await axios.get(`${NEXT_PUBLIC_URL}users/producer/${user.sid}`)
      const info = data.producerInfo
      setProducerInfo(info)
    } catch (error) {
      console.error(error.response.data.message)
    }
  }
  
  useEffect(()=>{
    fetchData()
  }, [])
  
  useEffect(() => {
    if (userLocalStorage && userLocalStorage.role === "producer") {
      fetchProducerMovies(user)
      fetchProducerInfo(user)
    }  
  }, [userLocalStorage])

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
  const closePreviewModal = () => {
    setPreviewEditOpen(false);
  };
  const openPreviewModal = (movie) => {
    setPreviewMovieData({
      id: movie.id,
      poster: movie.poster,
      name: movie.name,
      genres: movie.genres.map(genre => genre.name),
      countries : movie.countries.map(country => country.name),
      director : movie.director,
      description : movie.description,
      movie: movie.movie,
      trailer: movie.trailer,
      edit: true

  })
  setPreviewEditOpen(true)

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
          <div className={style["producer-info"]}>
            {userLocalStorage && userLocalStorage.role === "producer" ? <p>Saldo: {producerInfo.payment_amount}$</p> : null}
            {userLocalStorage && userLocalStorage.role === "producer" ? <p>Numero de telefono: {producerInfo.phone}</p> : null}
            {userLocalStorage && userLocalStorage.role === "producer" ? <p>Cuenta: {producerInfo.payment_method}</p> : null}
            {userLocalStorage && userLocalStorage.role === "producer" ? <p>Correo de la cuenta: {producerInfo.payment_account}</p> : null}
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
              <Link key={movie.id} href={`/detail/+`}>
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
  
            {producerMovies.length > 0 ? producerMovies.map((movie) => (
                <div className={style["movie"]}>
              <Link key={movie.id} href={`/detail/${movie.id}`}>
                  <img src={movie.poster} alt={movie.name} />
                  <p>{movie.name}</p>
              </Link>
                  <Button emoji={'✏️'} label={'Editar'} color={'green'} callback={() => openPreviewModal(movie)}></Button>
                  <ModalEdit isOpen={previewEditOpen} onClose={closePreviewModal} movieData={previewMovieData}  />
                </div>
            ))
            
            
            
            : <h3 className={style['sinCompras']}>Aun no tienes Peliculas para ver</h3>
            
          }
          </div>
        </div> 
        : null }
      </div>
    </div>
  );
}

export default withPageAuthRequired(Account) 