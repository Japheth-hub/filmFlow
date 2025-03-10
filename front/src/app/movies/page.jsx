"use client";
import axios from "axios";
import { useState, useEffect,Suspense } from "react";
import Movie from "@/components/movie/Movie";
import style from "./page.module.scss";
import { useSearchParams } from 'next/navigation'
import { useRouter } from "next/navigation";
import Button from '@/components/button/Button'
import notSearchIMG from '@/img/notSearch.png'
import Image from "next/image";
import Multiselect from '@/components/multiselect/Multiselect'

const MoviesPage = () => {
  return (
    <Suspense>
      <Movies />
    </Suspense>
  );
};

const Movies = ({ params }) => {
  const URL = process.env.NEXT_PUBLIC_URL;
  const router = useRouter();
  const [queryParams,setQueryParams] = useState();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const genre = searchParams.get("genre");
  const orderType = searchParams.get("orderType");
  const order = searchParams.get("order");
  const country = searchParams.get("country");


  const cleanQuery = (query)=>{ 
    const cleaned = Object.entries(query).filter(([key, value]) => value !== null);
    const cleanedObject = Object.fromEntries(cleaned);
    return cleanedObject;
  }  

  const cleanFilter = ()=>{
    const updatedSearchParams = new URLSearchParams({});
    router.push(`movies?${updatedSearchParams.toString()}`);
  }

  


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

  const [countries, setCountries] = useState([
    {
      id: "cargando",
      name: "cargando",
    },
  ]);
 
  
  //?ALMACENAMOS LA PAGINACION
  const [pagination, setPagination] = useState({
    page: 1,
    step: 10,
  });

  //?GENERA LOS GENEROS DEL SELECT
  useEffect(() => {
    const getGenres = async () => {
      try {
        let { data } = await axios.get(`${URL}genres`);
        let dataCountries = await axios.get(`${URL}countries?existent=true`);
        setGenres(data);
        const capitalize = dataCountries.data.map((pais) => ({
          ...pais,
          name: pais.name.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ")
        }));
        setCountries(capitalize);
      } catch (error) {
        console.error('Error fetching genres or countries:', error);
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
      country
    });

    setPagination({...pagination, page: 1})

  }, [searchParams])
  

  useEffect(() => {
    if(queryParams){
      try{
        const getMovies = async () => {
          try {
            const query = new URLSearchParams(cleanQuery(queryParams)).toString();
            let { data } = await axios.get(`${URL}movies?${query}`);
            setMovies(data);
          } catch (error) {
            setMovies(error.response.data.message)
            console.error(error)
          };
          }
        getMovies();
      }catch(error){
        console.error(error);
      }
    }
  }, [queryParams]);


  //?APLICAMOS CAMBIOS A LA QUERY DEL BACK CON LOS VALUES DEL USER
  const handleChange = (event) => {
    const { name, value } = event.target;
    const searchParamsObject = {};
    searchParams.forEach((value, key) => {
      searchParamsObject[key] = value;
    });
  
    searchParamsObject[name] = value;
  
    const updatedSearchParams = new URLSearchParams(searchParamsObject);

    router.push(`movies?${updatedSearchParams.toString()}`);
    
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

  const handleElemPagination = (event) => {
    setPagination({...pagination, step: event.target.value, page: 1})
  }

  return (
    <div>
      <div>
        <div className={style.genres}>
              {queryParams && 
                <Multiselect name="genre" initial={queryParams.genre ? queryParams.genre: null} items={genres} callback={handleChange} />
              } 
        </div>
        <form>
          <fieldset className={style.rowField}>
            <div className={style.optionsField}>
              <label>Países </label>
              {queryParams && 
                <Multiselect name="country" initial={queryParams.country ? queryParams.country: null} items={countries} callback={handleChange} type="select" />
              }
            </div>
            <div className={style.optionsField}>
              <label>Ordernar por </label>
              <select 
                name="orderType"
                value={queryParams?.orderType || ""}
                onChange={handleChange}
              >
                <option value={""} >Seleccione...</option>
                <option value={"name"}>Nombre</option>
                <option value={"duration"}>Duracion</option>
              </select>
            </div>
            <div className={style.optionsField}>
              <label>Orden </label>
              <select
                name="order"
                value={queryParams?.order || ""}
                onChange={handleChange}
              >
                <option value={""}>Seleccione...</option>
                <option value={"asc"}>Ascendente</option>
                <option value={"desc"}>Descendente</option>
              </select>
            </div>
            <div className={style.optionsField}>
              <label>Películas </label>
              <select
                name="elemPagination"
                value={pagination.step}
                onChange={handleElemPagination}
              >
              {(() => {
                const options = [];
                for (let i = 10; i < 21; i += 5) {
                  options.push(
                    <option key={i} value={i}>
                      {i}
                    </option>
                  );
                }
                return options;
              })()}
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

export default MoviesPage;