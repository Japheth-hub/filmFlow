'use client'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Movies from '@/app/movies/Movies'
import { useSearchParams,useRouter } from 'next/navigation'

const FiltersView = () => {
    const URL = process.env.NEXT_PUBLIC_URL
    const searchParams = useSearchParams();
    const search = searchParams.get("search");
    const genre = searchParams.get("genre");
    const orderType = searchParams.get("orderType");
    const order = searchParams.get("order");
    const router = useRouter();
    const [queryParams,setQueryParams] = useState({})


    const cleanQuery = (query)=>{ 
        const cleaned = Object.entries(query).filter(([key, value]) => value !== null);
        const cleanedObject = Object.fromEntries(cleaned);
        return cleanedObject;
    }   



    
    const [movies, setMovies] = useState(
        [{
            id: 'cargando',
            name: 'cargando'
        }]
    )
    const [genres, setGenres] = useState(
        [{
            id: 'cargando',
            name: 'cargando'
        }]
    )
    const [dataFilter, setDataFilter] = useState({
        search: "",
        genre: "",
        orderType: "",
        order: "" 
    })

    const getMovies = async() => {
        console.log(queryParams);
        const query = new URLSearchParams(cleanQuery(queryParams)).toString();
        let { data } = await axios.get(`${URL}movies?${query}`)
        console.log(data);
        if(data !== "No hay Peliculas") return setMovies(data)
        setMovies([{id: 0, name: "Not Found"}])
    }
    
    useEffect(() => {
        
        getMovies();
        const getGenres = async() => {
            let { data } = await axios.get(`${URL}genres`)
            setGenres(data)
        }
        getGenres()
    },[]);

    useEffect(() => {
        setQueryParams({
            search,
            genre,
            orderType,
            order,
        })
    },[]);

    useEffect(() => {
       getMovies();
    },[queryParams]);

    

    const handleChange = (event,name) => {
        setDataFilter({ ...dataFilter, [name]: event.target.value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const queryString = new URLSearchParams(dataFilter).toString();
        router.push(`?${queryString}`);
        setQueryParams(dataFilter);

    }

    return(
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <div>
                            <label>Frase:</label>
                            <input
                                type='text'
                                name='search'
                                value={dataFilter.search}
                                onChange={(event)=>handleChange(event,"search")}
                            />
                        </div>
                        <div>
                            <label>Genre:</label>
                            <select name='genre' value={dataFilter.genre} onChange={(event)=>handleChange(event,"genre")}>
                                <option value={''} >Seleccione...</option>
                                {genres.map(elem => (
                                    <option key={elem.id} value={elem.name}>{elem.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>OrderType:</label>
                            <select name='orderType' value={dataFilter.orderType} onChange={(event)=>handleChange(event,"orderType")}>
                                <option value={''} >Seleccione...</option>
                                <option value={'name'} >Nombre</option>
                            </select>
                        </div>
                        <div>
                            <label>Order:</label>
                            <select name='order' value={dataFilter.order} onChange={(event)=>handleChange(event,"order")}>
                                <option value={''} >Seleccione...</option>
                                <option value={'asc'} >Ascendente</option>
                                <option value={'desc'} >Descendente</option>
                            </select>

                        </div>
                        <div>
                            <input
                                type='Submit'
                                value="Aplicar"
                                onChange={handleChange}
                            />
                        </div>
                    </fieldset>
                </form>
            </div>
            <div>
                <h3>Filtrar</h3>
                <Movies movie={movies} />
            </div>
        </div>
    )
}

export default FiltersView;