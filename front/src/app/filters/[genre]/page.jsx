"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import Movie from "../../../components/movie/Movie";
import style from "./page.module.css";
import { useSearchParams } from 'next/navigation'
import { useRouter } from "next/navigation";
import Button from '../../../components/button/Button'

const Filter = ({ params }) => {
  const router = useRouter()
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('s') || "";
  const URL = process.env.NEXT_PUBLIC_URL;
  let URL2 = URL;

  //?LEE LO QUE VIENE POR PARAMS.
  //  -> si es un GENERO O UNA FRASE DEL ONSEARCH
  let condicion = params.genre.split("%3D")
  condicion[0] !== "search"
  ? condicion[1] !== "search" 
    ?(URL2 += `movies?search=&genre=${condicion[1]}`)
    :(URL2 += `movies?search=${searchQuery}`)
  : (URL2 += `movies?search=${condicion[1]}`)

 //?ALMACENAMOS LAS PELICULAS 
  const [movies, setMovies] = useState([
    {
      id: "cargando",
      name: "cargando",
    },
  ]);

  //?ALMACENAMOS LOS GENEROS
  const [genres, setGenres] = useState([
    {
      id: "cargando",
      name: "cargando",
    },
  ]);
  //?ALMACENAMOS LOS DATOS QUE INGRESA EL USER
  const [dataFilter, setDataFilter] = useState({
    search: "",
    genre: "",
    orderType: "",
    order: "",
  });
  //?ALMACENAMOS LA URL QUE HACE LA QUERY AL BACK
  const [urlFilter, setUrlFilter] = useState(URL2);
  //?ALMACENAMOS LA PAGINACION
  const [pagination, setPagination] = useState({
    page: 1,
    step: 12,
  });

  //?GENERA LOS GENEROS DEL SELECT
  useEffect(() => {
    const getGenres = async () => {
      let { data } = await axios.get(`${URL}genres`);
      setGenres(data);
    };
    getGenres();
  }, []);

  //?MONITOREA Y APLICA EL CAMBIO EN LA QUERY AL BACK 
  //?SETEA LAS PELICULAS EN EL ESTADO
  useEffect(() => {
    const getMovies = async () => {
      let { data } = await axios.get(urlFilter);
      if (data !== "No hay Peliculas") return setMovies(data);
      setMovies([{ id: 0, name: "Not Found" }]);
    };
    getMovies();
  }, [urlFilter]);

  useEffect(() => {
    
  }, [dataFilter])

  //?SETTEAMOS LO QUE VIENE DE SEARCHBAR EN LA QUERY AL BACK 
  if(condicion[0] === "search"){
    if(condicion[1]){
      if(dataFilter.search !== condicion[1]){
        let valueQuery = condicion[1];
        setDataFilter({ ...dataFilter, search: valueQuery })
        console.log('setting search', condicion);
      }
    }
  }

  //?APLICAMOS CAMBIOS A LA QUERY DEL BACK CON LOS VALUES DEL USER
  const handleChange = (event) => {
    
    if(event.target.name === "genre"){
      setDataFilter({ ...dataFilter, genre: event.target.value })
      URL2 = URL 
                  + `movies?search=${dataFilter.search}`
                  + `&genre=${event.target.value}`
                  + `&orderType=${dataFilter.orderType}`
                  + `&order=${dataFilter.order}`
      setUrlFilter(URL2)
      setPagination({...pagination, page: 1})
    }
    if(event.target.name === "orderType"){
      setDataFilter({ ...dataFilter, orderType: event.target.value })
      URL2 = URL 
                  + `movies?search=${dataFilter.search}`
                  + `&genre=${dataFilter.genre}`
                  + `&orderType=${event.target.value}`
                  + `&order=${dataFilter.order}`
      setUrlFilter(URL2)
      setPagination({...pagination, page: 1})
    }
    if(event.target.name === "order"){
      setDataFilter({ ...dataFilter, order: event.target.value })
      URL2 = URL 
                  + `movies?search=${dataFilter.search}`
                  + `&genre=${dataFilter.genre}`
                  + `&orderType=${dataFilter.orderType}`
                  + `&order=${event.target.value}`
      setUrlFilter(URL2)
      setPagination({...pagination, page: 1})
    }
  };

  //?APLICAMOS EL FILTER LIMPIANDO LA URL
  const cleanFilter = () => {
    setDataFilter({ ...dataFilter, search: "" })
    URL2 = URL + `movies?search=`
    setUrlFilter(URL2)
    router.push("/filters/search=")
  };

  const handleClick = () => {
    cleanFilter()
  }

  //?Fn PARA MOVER EL PAGINADO 
  const changePage = (direct) => {
    if (direct === "prev") {
      if (pagination.page > 1) {
        setPagination({ ...pagination, page: pagination.page - 1 });
      }
    } else {
      if (pagination.page < Math.ceil(movies.length / pagination.step)) {
        setPagination({ ...pagination, page: pagination.page + 1 });
      }
    }
  };

  return (
    <div>
      <div>
        <form>
          <fieldset className={style.rowField}>
            <div className={style.optionsField}>
              <label>Genre </label>
              <select
                name="genre"
                value={dataFilter.genre}
                onChange={handleChange}
              >
                <option value={""}>Seleccione...</option>
                {genres.map((elem) => (
                  <option key={elem.id} value={elem.name}>
                    {elem.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={style.optionsField}>
              <label>OrderType </label>
              <select
                name="orderType"
                value={dataFilter.orderType}
                onChange={handleChange}
              >
                <option value={""} >Seleccione...</option>
                <option value={"name"}>Name</option>
                <option value={"duration"}>Duration</option>
              </select>
            </div>
            <div className={style.optionsField}>
              <label>Order </label>
              <select
                name="order"
                value={dataFilter.order}
                onChange={handleChange}
              >
                <option value={""}>Seleccione...</option>
                <option value={"asc"}>Ascendente</option>
                <option value={"desc"}>Descendente</option>
              </select>
            </div>
            <div>
              <input
                className={style.optionsField}
                type="button"
                value="Limpiar"
                onClick={() => cleanFilter()}
              />
              {/*
               <Button emoji={""} label={"Clean"} callback={() => cleanFilter()}/> */}
            </div>
          </fieldset>
        </form>
      </div>

      {/* MOSTRAR PELICULAS */}
      {/* REVISAR LA POSIBILIDAD DE REFACTORIZAR CON SLICE */}
      <div className={`container ${style.order}`}>
        {movies.map((elem, index) => {
          if (
            index >= (pagination.page - 1) * pagination.step &&
            index <= pagination.page * pagination.step - 1
          ) {
            return <Movie key={elem.id} elem={elem} />;
          }
        })}
      </div>

      {/* MOSTRAR BOTONES DE PAGINACION */}
      <div className="container">
        <div className={style.pagination}>
          <input
            className={style.pagination}
            type="button"
            value="Anterior"
            onChange={handleChange}
            onClick={() => changePage("prev")}
          />
          <label className={style.pagination}>{pagination.page}</label>
          <input
            className={style.pagination}
            type="button"
            value="Siguiente"
            onChange={handleChange}
            onClick={() => changePage("next")}
          />
        </div>
      </div>
    </div>
  );
};

export default Filter;
