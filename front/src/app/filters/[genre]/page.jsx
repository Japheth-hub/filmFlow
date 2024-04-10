"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import Movie from "../../../components/movie/Movie";
import style from "./page.module.scss";
import { useSearchParams } from 'next/navigation'
import { useRouter } from "next/navigation";
import Button from '../../../components/button/Button'
import notSearchIMG from '../../../img/notSearch.png'
import Image from "next/image";

const Filter = ({ params }) => {
  const router = useRouter()
  const [queryParams,setQueryParams] = useState();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const genre = searchParams.get("genre");
  const orderType = searchParams.get("orderType");
  const order = searchParams.get("order");


  const cleanQuery = (query)=>{ 
    const cleaned = Object.entries(query).filter(([key, value]) => value !== null);
    const cleanedObject = Object.fromEntries(cleaned);
    return cleanedObject;
}  

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
      try {
        let { data } = await axios.get(`${URL}genres`);
        setGenres(data);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };
    getGenres();
  }, []);

  useEffect(() => {
    setQueryParams({
      search,
      genre,
      orderType,
      order,
    });
  }, [searchParams])
  

  useEffect(() => {
    if (queryParams) {
      const getMovies = async () => {
        try {
          const query = new URLSearchParams(cleanQuery(queryParams)).toString();
          let { data } = await axios.get(`${URL}movies?${query}`);
          setMovies(data);
        } catch (error) {
          console.error('Error fetching movies:', error);
        }
      };
      getMovies();
    }
  }, [queryParams]);

  //?SETTEAMOS LO QUE VIENE DE SEARCHBAR EN LA QUERY AL BACK 
  if(condicion[0] === "search"){
    if(condicion[1]){
      if(dataFilter.search !== condicion[1]){
        let valueQuery = condicion[1];
        setDataFilter({ ...dataFilter, search: valueQuery })
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
    router.push("/filters/search=")
    setUrlFilter(URL2)
  };

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
    }};

  return (
    <div>
      <div>
        <form>
          <fieldset className={style.rowField}>
            <div className={style.optionsField}>
              <label>Género </label>
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
              <label>Ordernar por </label>
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
              <label>Orden </label>
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
            <div >
              <input
                className={style.button}
                type="button"
                value="Limpiar"
                onClick={() => cleanFilter()}
              />
            </div>
          </fieldset>
        </form>
      </div>

      {/* REVISAR LA POSIBILIDAD DE REFACTORIZAR CON SLICE */}
      <div className={`container ${style.order}`}>
        {
          (typeof(movies) === 'string')
          ? (
            <div>
              <br />
              <Image
                src={notSearchIMG}
                width='200px'
                height='300px'
                alt='notFound'
              />                  
              <h4>No se encontraron coincidencias</h4>
            </div>
            )
          : (
            movies.map((elem, index) => {
              if (
                index >= (pagination.page - 1) * pagination.step &&
                index <= pagination.page * pagination.step - 1
              ) {
                return <Movie key={elem.id} elem={elem} />;
              }
            }))}
      </div>
      {/* MOSTRAR BOTONES DE PAGINACION */
        (typeof(movies) === 'object')
        ?(
          <div className="container">
            <div className={style.pagination}>
              <Button label='Anterior' callback={() => changePage("prev")}/>
              <label className={style.pagination}>{pagination.page} de {Math.ceil(movies.length / pagination.step)}</label>
              <Button label='Siguiente' callback={() => changePage("next")}/>
            </div>
          </div>
        )
        : <div></div>
      }
    </div>
  );
};

export default Filter;