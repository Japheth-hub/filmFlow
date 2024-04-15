import './modalPromo.scss'
import Button from "../button/Button";
import { useEffect, useState } from 'react';
import Loading from '@/components/loading/loading'
import { showSelects } from '@/helpers/dashboard';



export default function ModalPromo({showModal}) {

  const [option, setOption] = useState('Movies')
  const [movies, setMovies] = useState()
  const [genres, setGenres] = useState()
  const [elements, setElements] = useState([])
  const [tags, setTags] = useState([])

  function handleOption(e){
    setOption(e.target.value)
    setElements([])
  }

  function handleSelect(e){
    const element = e.target.value
    setElements([...elements, element])
  }

  useEffect(()=>{
    async function getData(){
      const data = await showSelects();
      setMovies(data.movies)
      setGenres(data.genres)
    }
    getData()
  }, [])

  return (
    <div className="modal">
      <h4>Crear Promocion</h4>
      <label htmlFor="">Agregue el porcenatje de descuento</label>
      <input type="number"/>
      <label htmlFor="">Fecha de inicio</label>
      <input  type="date" id="fecha" name="fecha"/>
      <label htmlFor="">Fecha de caducidad</label>
      <input  type="date" id="fecha" name="fecha"/>
      <label htmlFor="">A que opcion le vas a aplicar la promocion</label>
      <label htmlFor="opcion1">Peliculas:</label>
      <input type="radio" name="opciones" defaultChecked value="Movies" onChange={handleOption}/>
      <label htmlFor="opcion2">Generos:</label>
      <input type="radio" name="opciones" value="Genres" onChange={handleOption}/>

      {option === 'Movies' 
        ? (
          <select name="Movies" defaultValue='movies' onChange={handleSelect}>
            <option value="movies" disabled>Peliculas</option>
            {movies && movies.map((movie)=>{
              return <option id={movie.id} value={movie.name}>{movie.name}</option>
            })}
          </select>
          )
        : (
          <select name='Genres' defaultValue={'genres'} onChange={handleSelect}>
            <option value="genres" disabled>Generos</option>
            {genres && genres.map((genre)=>{
              return <option value={genre.id}>{genre.name}</option>;
            })}
          </select>
          )
      }

      <div>
        <p>tags</p>
        
      </div>

      <div className="reviewBtn">
        <Button label={"Crear"} color={"green"} callback={() => {}} />
        <Button label={"Cerrar"} color={"red"} callback={() => {showModal("none")}}/>
      </div>
    </div>
  );
}
