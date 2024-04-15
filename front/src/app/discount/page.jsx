'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import style from './discount.module.scss'
import Button from '../../components/button/Button'
import Loading from "@/components/loading/loading";
import CheckRole from '@/components/checkRole/checkRole'
import Swal from 'sweetalert2'
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { updateLocaleStorage } from "@/helpers/updateLocaleStorage";

const Discount = () =>{
    const URL = process.env.NEXT_PUBLIC_URL
    let { user, isLoading } = useUser()

    const [code,setCode] = useState('')
    const [selectedMovies, setSelectedMovies] = useState([]); 
    const [selectedGenres, setSelectedGenres] = useState([])
    const [starts, setStarts] = useState('');
    const [ends, setEnds] = useState('');
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [percentage, setPercentage] = useState(0);
    const [discounts, setDiscounts] = useState([]);
    const [userRole, setUserRole] = useState('')
    const [userLocalStorage,setUserLocalStorage] = useState({});

    useEffect(() => {
        if(user){
          updateLocaleStorage(user)
        }
    
        const userstorage =(window.localStorage.getItem('FilmFlowUsr') 
          ? JSON.parse(window.localStorage.getItem('FilmFlowUsr'))
          : null)
    
          setUserLocalStorage(userstorage);        
          
        }, [user]);
    
    
        useEffect(()=>{
    
          if(userLocalStorage.role) {
              try {
                setUserRole(userLocalStorage.role)
              } catch (error) {
                console.error(error)
              }
            }
        },[userLocalStorage])

        
    useEffect(() => {
        const fetchData = async () => {
            try {
                const moviesRes = await axios.get(`${URL}movies`);
                setMovies(moviesRes.data);
                const genresRes = await axios.get(`${URL}genres`);
                setGenres(genresRes.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
      
        fetchData();
    }, []);

    useEffect(() => {
        const fetchDiscounts = async () => {
            try {
                const response = await axios.get(`${URL}discount`);
                setDiscounts(response.data);
            } catch (error) {
                console.error('Error fetching discounts:', error);
            }
        };

        fetchDiscounts();
    }, []);

    

    const generateDiscountCode = async () => {
        if (selectedMovies.length === 0 && selectedGenres.length === 0) {
            
            const allMoviesIds = movies.map((movie) => movie.id);
            setSelectedMovies(allMoviesIds);

        } else if (selectedMovies.length > 0 && selectedGenres.length > 0) {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'No puede seleccionar una película y un género a la vez.',
            });
            return;
        }
        
        if (!percentage || percentage <= 0 || percentage > 100) {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'El porcentaje tiene que ser un numero entero entre 1 y 100 (ej: 5, 10, 15).',
            });
            return;
        }

        const currentDate = new Date(); 
        
        if (starts <= currentDate) {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'La fecha de inicio deber ser diferente a la fecha actual.',
            });
            return;
        }

        if (ends <= starts) {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'La fecha de caducidad deber ser diferente a la fecha de inicio.',
            });
            return;
        }
        
        try {

            if(selectedMovies.length > 0 && selectedGenres.length === 0){

                const response = await axios.post(`${URL}discount`, {
                    selectedMovies,
                    percentage: percentage,
                    starts,
                    ends
                });

                setCode(response.data.code.code);
                setDiscounts((prevDiscounts) => [...prevDiscounts, response.data.code]);

                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: `¡El código de descuento se ha generado con éxito! Código: ${response.data.code.code}`,
                });
            }

            if(selectedGenres.length > 0 && selectedMovies.length === 0){
                const response = await axios.post(`${URL}discount`, {
                    selectedGenres,
                    percentage: percentage,
                    starts,
                    ends
                });

                setCode(response.data.code.code);
                setDiscounts((prevDiscounts) => [...prevDiscounts, response.data.code]);

                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: `¡El código de descuento se ha generado con éxito! Código: ${response.data.code.code}`,
                });
            }
            
            
        } catch (error) {
            console.error('Error generating discount code:', error);
        }
    };

    const toggleMovieSelection = (movieId) => {
        setSelectedMovies((prev) =>
            prev.includes(movieId)
                ? prev.filter((m) => m !== movieId)
                : [...prev, movieId]
        );
    };

    const toggleGenreSelection = (genreId) => {
        setSelectedGenres((prev) =>
            prev.includes(genreId)
                ? prev.filter((g) => g !== genreId)
                : [...prev, genreId]
        );
    };

    if (isLoading) {
        return <Loading></Loading>;
    }
    
    return(
        <CheckRole userRole={userRole} requiredRoles="admin">
        <div className={style.discountContainer}>

            <h2>Generador de códigos de descuento</h2>

            <div className={style.columnContainer}>
                <div className={style.column}>
                    <h3>Selecciona una película(o varias)</h3>
                    {movies.map((movie) => (
                        <div key={movie.id}>
                            <input
                                type="checkbox"
                                checked={selectedMovies.includes(movie.id)}
                                onChange={() => toggleMovieSelection(movie.id)}
                            />
                            <label>{movie.name}</label>
                        </div>
                    ))}
                </div>

                <div className={style.column}>
                    <h3>Selecciona un género(o varios)</h3>
                    {genres.map((genre) => (
                        <div key={genre.id}>
                            <input
                                type="checkbox"
                                checked={selectedGenres.includes(genre.id)}
                                onChange={() => toggleGenreSelection(genre.id)}
                            />
                            <label>{genre.name}</label>
                        </div>
                    ))}
                </div>

            </div>

            <div className={style.infoContainer}>
                <div className={style.info}>
                    <label>Porcentaje de descuento:     </label>
                    <input
                        className={style.input}
                        type="number"
                        value={percentage}
                        onChange={(e) => setPercentage(parseInt(e.target.value))}
                    />
                </div>
                
                <div className={style.info}>
                    <label htmlFor="startsDate">Fecha de inicio:    </label>
                    <input
                        className={style.input}
                        type="datetime-local"
                        id="startsDate"
                        value={starts} 
                        onChange={(e) => setStarts(e.target.value)} 
                    />
                </div>

                <div className={style.info}>
                    <label htmlFor="endsDate">Fecha de caducidad:  </label>
                    <input
                        className={style.input}                    
                        type="datetime-local"
                        id="endsDate"
                        value={ends} 
                        onChange={(e) => setEnds(e.target.value)} 
                    />
                </div>
            </div>


            <div className={style.buttonContainer}>
                <Button label="Crea tu codigo!" color="primary" callback={generateDiscountCode} />
            </div>
        </div>
    </CheckRole>
    )
}

export default withPageAuthRequired(Discount);