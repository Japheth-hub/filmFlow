'use client'
import axios from "axios";
import Movies from "../movies/Movies";
import Carousel from "../carousel/Carousel";
import SearchBar from "../searchBar/searchBar";
import { useState, useEffect } from "react";
import Link from 'next/link';

const Home = () => {
  const URL = process.env.NEXT_PUBLIC_URL
  const [results, setResults] = useState([])
  const [movie, setMovie] = useState(
    [{
      id: 'cargando',
      title: 'cargando'
    }]
  )
  useEffect(() => {
    const getMovies = async() => {
      let { data } = await axios.get(`${URL}fake`)
      setMovie(data)
    }
    getMovies()
  },[]);


  const handleSearch = async (query) => {
    try {
      const response = await axios(` http://localhost:3001/movies?search=${query}`)
      console.log('pelis', response);
      const data = await response.data
      console.log('ola', data)
      setResults(data)
    } catch (error) {
      
    }

  }

  return (
  <div>
    {/* HEADER */}
    <div className="container">
      {/* TITLE */}
      <div> 
        <h1>FilmFlow</h1>
      </div>
      {/* SEARCHBAR */}
      <div>
        <SearchBar onSearch = {handleSearch}/>
      </div>
      <div>
        <h2>UserInfo</h2>
      </div>
    </div>
    {/* FORM MOVIE*/}
    <div className="container">
      <Link href="/form">
        <button>Ir a Formulario</button>
      </Link>
    </div>
    {/* CARROUSEL */}
    <Carousel movie={movie}/>
    {/* FILTROS RÁPIDOS */}
    <div>
      <h3>Section filters</h3> 
    </div>
    {/* COLLECTIONS */}
    <div>
      <h3>Novedades</h3>
      <Movies movie={movie} />
      <h5>Ver más..</h5>
    </div>
    {/* FOOTER */}
    <div>
      <div>
        <h4>FOOTER</h4>
      </div>
    </div>
  </div>
  );
}

export default Home;