'use client'
import axios from "axios";
import Movies from "../../components/movies/Movies";
import Carousel from "../../components/carousel/Carousel";
import SearchBar from "../../components/searchBar/searchBar";
import { useState, useEffect } from "react";
import Filters from "@/components/filters/Filters";
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from "next/link";
import Loading from "@/components/loading/loading";

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
          label: 'Search',
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

  useEffect( () => {
    if(user){
      const upUser = async() => {
        try {
          const { data } = await axios.post(`${URL}users`, user)    
          if (typeof window !== 'undefined') {
            window.localStorage.setItem(
              'FilmFlowUsr', JSON.stringify({...user, admin:data.isAdmin})
            )
          } 
          if(data.isAdmin) {
            console.log("Si soy admin")
          } else {
            console.log("No soy admin")
          }
        } catch (error) {
          console.error("Error updating user:", error);
        }
      }
      upUser()
    }
  }, [user])

  if(isLoading){
    return <Loading></Loading>
  }

  return (
  <div>
    <Carousel movie={movie} dim={['900px', '400px']} autoplay={5}/>
    <div>
      <Filters genres={genres}/>
    </div>
    <div>
      <h3>Novedades</h3>
      <Movies movie={movie} />
      <Link href={`/filters/search=`}><h3>Ver más..</h3></Link>
    </div>
  </div>
  );
}

export default Home;
