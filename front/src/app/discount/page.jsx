'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import style from './discount.module.scss'
import Button from '../../components/button/Button'
import Swal from 'sweetalert2'

const Discount = () =>{
    const URL = process.env.NEXT_PUBLIC_URL
    const [code,setCode] = useState('')
    const [selectedMovies, setSelectedMovies] = useState([]); 
    const [selectedGenres, setSelectedGenres] = useState([])
    const [starts, setStarts] = useState('');
    const [ends, setEnds] = useState('');
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [percentage, setPercentage] = useState(0);
    const [discounts, setDiscounts] = useState([]);
    

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

        const currentDate = new Date().toISOString().split('T')[0]; 
        
        if (starts.substr(0, 10) <= currentDate) {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'La fecha de inicio deber ser diferente a la fecha actual.',
            });
            return;
        }

        if (ends.substr(0, 10) <= starts.substr(0, 10)) {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'La fecha de caducidad deber ser diferente a la fecha de inicio.',
            });
            return;
        }
        
        try {
            const response = await axios.post(`${URL}discount`, {
                selectedMovies,
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
        setMovieError('');
    };

    const toggleGenreSelection = (genreId) => {
        setSelectedGenres((prev) =>
            prev.includes(genreId)
                ? prev.filter((g) => g !== genreId)
                : [...prev, genreId]
        );
        setMovieError('');
    };
    
    return(
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
                        type="date"
                        id="startsDate"
                        value={starts.substr(0, 10)} 
                        onChange={(e) => setStarts(e.target.value + 'T12:00:00Z')} 
                    />
                    <input
                        className={style.input}
                        type="time"
                        value={starts.substr(11, 5)} 
                        onChange={(e) => setStarts(`${starts.substr(0, 10)}T${e.target.value}:00Z`)}
                    />
                </div>

                <div className={style.info}>
                    <label htmlFor="endsDate">Fecha de caducidad:  </label>
                    <input
                        className={style.input}                    
                        type="date"
                        id="endsDate"
                        value={ends.substr(0, 10)} 
                        onChange={(e) => setEnds(e.target.value + 'T12:00:00Z')} 
                    />
                    <input
                        className={style.input}
                        type="time"
                        value={ends.substr(11, 5)} 
                        onChange={(e) => setEnds(`${ends.substr(0, 10)}T${e.target.value}:00Z`)} 
                    />
                </div>
            </div>


            <div className={style.buttonContainer}>
                <Button label="Crea tu codigo!" color="primary" callback={generateDiscountCode} />
            </div>

        </div>
    )
}

export default Discount;