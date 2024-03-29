'use client'
import axios from "axios";
import Movies from "../../components/movies/Movies";
import Carousel from "../../components/carousel/Carousel";
import SearchBar from "../../components/searchBar/searchBar";
import { useState, useEffect } from "react";
import Filters from "../filters/Filters";
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from "next/link";

const Home = () => {
  const {error, isLoading, user} = useUser()
  const URL = process.env.NEXT_PUBLIC_URL
  const [results, setResults] = useState([])
  const [movie, setMovie] = useState(
    [{
      id: 'cargando',
      title: 'cargando'
    }]
  )
  const [genres, setGenres] = useState(
    [{
      id: 'cargando',
      name: 'cargando'
    }]
  )

  useEffect(() => {
    const getMovies = async() => {
      let { data } = await axios.get(`${URL}movies`)
      setMovie(data)
    }
    const getGenres = async() => {
      let { data } = await axios.get(`${URL}genres`)
      let listGenre = data
      listGenre.unshift({
        id: '-1',
        name: 'search',
        label: 'Search',
        emoji:"🔍"
      })
      setGenres(data)
    }
    getMovies()
    getGenres();

  },[]);

  useEffect( () => {
    if(user){
      const upUser = async() => {
        const { data } = await axios.post(`${URL}users`, user)        
          window.localStorage.setItem(
            'FilmFlowUsr', JSON.stringify(user)
          )
      }
      upUser()
    }
  }, [user])

  return (
  <div>
    <Carousel movie={movie} dim={['900px', '400px']} autoplay={5}/>
    <div>
      <Filters genres={genres}/>
    </div>
    <div>
      <h3>Novedades</h3>
      <Movies movie={movie} />
      <Link href={`/filters/search=`}><h6>Ver más..</h6></Link>
    </div>
  </div>
  );
}

export default Home;
