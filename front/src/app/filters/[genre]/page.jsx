"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import Movie from "../../../components/movie/Movie";
import style from "./page.module.css";
import {useSearchParams} from 'next/navigation'

const Filter = ({ params }) => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('s') || "";
  const URL = process.env.NEXT_PUBLIC_URL;
  let URL2 = URL;
  params.genre !== "search"
    ? (URL2 = URL2 + `movies?search=&genre=${params.genre}`)
    : (URL2 = URL + `movies?search=${searchQuery}`);
  const [urlFilter, setUrlFilter] = useState([URL2]);
  const [movies, setMovies] = useState([
    {
      id: "cargando",
      name: "cargando",
    },
  ]);
  const [genres, setGenres] = useState([
    {
      id: "cargando",
      name: "cargando",
    },
  ]);
  const [dataFilter, setDataFilter] = useState({
    search: searchQuery,
    genre: "",
    orderType: "",
    order: "",
  });
  const [pagination, setPagination] = useState({
    page: 1,
    step: 12,
  });

  useEffect(() => {
    const getGenres = async () => {
      let { data } = await axios.get(`${URL}genres`);
      setGenres(data);
    };
    getGenres();
  }, []);
  useEffect(() => {
    const getMovies = async () => {
      let { data } = await axios.get(urlFilter);
      if (data !== "No hay Peliculas") return setMovies(data);
      setMovies([{ id: 0, name: "Not Found" }]);
    };
    getMovies();
  }, [urlFilter]);

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

  const handleChange = (event) => {
    if (event.target.name === "search") {
      setDataFilter({ ...dataFilter, search: event.target.value });
    } else if (event.target.name === "genre") {
      setDataFilter({ ...dataFilter, genre: event.target.value });
    } else if (event.target.name === "orderType") {
      setDataFilter({ ...dataFilter, orderType: event.target.value });
    } else if (event.target.name === "order") {
      setDataFilter({ ...dataFilter, order: event.target.value });
    }
  };

  const applyFilter = () => {
    URL2 = URL + `movies?search=${dataFilter.search}`;
    if (dataFilter.genre !== "") URL2 = URL2 + `&genre=${dataFilter.genre}`;
    if (dataFilter.orderType !== "")
      URL2 = URL2 + `&orderType=${dataFilter.orderType}`;
    if (dataFilter.order !== "") URL2 = URL2 + `&order=${dataFilter.order}`;
    setUrlFilter(URL2);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    applyFilter();
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <div>
              <label>Frase:</label>
              <input
                type="text"
                name="search"
                value={dataFilter.search}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Genre:</label>
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
            <div>
              <label>OrderType:</label>
              <select
                name="orderType"
                value={dataFilter.orderType}
                onChange={handleChange}
              >
                <option value={""}>Seleccione...</option>
                <option value={"name"}>Name</option>
                <option value={"duration"}>Duration</option>
              </select>
            </div>
            <div>
              <label>Order:</label>
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
                type="Submit"
                value="Aplicar"
                onChange={handleChange}
                onClick={() => applyFilter()}
              />
            </div>
          </fieldset>
        </form>
      </div>
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
      <div className="container">
        <div className={style.pagination}>
          <input
            className={style.pagination}
            type="button"
            value="Anterior"
            onClick={() => changePage("prev")}
          />
          <label className={style.pagination}>{pagination.page}</label>
          <input
            className={style.pagination}
            type="button"
            value="Siguiente"
            onClick={() => changePage("next")}
          />
        </div>
      </div>
    </div>
  );
};

export default Filter;
