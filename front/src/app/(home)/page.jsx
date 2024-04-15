'use client'
import axios from "axios";
import Movies from "../../components/movies/Movies";
import Carousel from "../../components/carousel/Carousel";
import { useState, useEffect } from "react";
import Filters from "@/components/filters/Filters";
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from "next/link";
import Loading from "@/components/loading/loading";
import { updateLocaleStorage } from "@/helpers/updateLocaleStorage";

const Home = () => {
  const {error, isLoading, user} = useUser()
  const URL = process.env.NEXT_PUBLIC_URL
  const [movie, setMovie] = useState()
  const [genres, setGenres] = useState()

  useEffect(() => {
    const getMovies = async() => {
      try {
        let { data } = await axios.get(`${URL}movies`)
        setMovie(data)
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }
    const getGenres = async() => {
      try {
        let { data } = await axios.get(`${URL}genres`)
        let listGenre = data
        listGenre.unshift({
          id: '-1',
          name: 'search',
          label: 'Buscar',
          emoji:"🔍"
        })
        setGenres(data)
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    }
    getMovies()
    getGenres();

  },[]);

  useEffect(() => {
    if(user){
      updateLocaleStorage(user)
    }
  }, [user])

  if(isLoading){
    return <Loading></Loading>
  }

  return (
  <div>

    {movie && <Carousel movie={movie} dim={['900px', '400px']} autoplay={5}/>}
    <div>
     {genres && <Filters genres={genres}/>}
    </div>
    <div>
      <h3>Novedades</h3>
      <Movies movie={movie} />
      <Link href={`movies`}><h3>Ver más..</h3></Link>
    </div>
  </div>
  );
}

export default Home;
