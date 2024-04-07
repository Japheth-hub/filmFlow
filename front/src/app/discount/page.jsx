'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Discount = () =>{
    const URL = process.env.NEXT_PUBLIC_URL
    const [code,setCode] = useState('')
    const [selectedMovies, setSelectedMovies] = useState([]); 
    const [selectedGenres, setSelectedGenres] = useState([])
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [percentage, setPercentage] = useState(0);

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

    const generateDiscountCode = async () => {
        

        if (selectedMovies.length === 0 && selectedGenres.length === 0) {
            alert('Please choose at least one movie or genre.');
            return;
        }
        
        if ((selectedGenres.length === 0 && selectedMovies.length >= 1) || (selectedGenres.length >= 1 && selectedMovies.length === 0)) {
           if (!percentage || percentage <= 0 || percentage > 100) {
                alert('Please enter a valid discount percentage.');
                return;
            } 
            try {
                const response = await axios.post(`${URL}discount`, {
                    selectedMovies,
                    selectedGenres,
                    percentage: parseFloat(percentage) / 100
                });
                setCode(response.data.code);
            } catch (error) {
                console.error('Error generating discount code:', error);
            }
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
    
    return(
        <div>
            <h2>Discount codes generator</h2>
            <div>
                <h3>Select movies</h3>
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
            <div>
                <h3>Select genres</h3>
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
            <div>
                <label>Discount percentage:</label>
                <input
                    type="number"
                    value={percentage}
                    onChange={(e) => setPercentage(e.target.value)}
                />
            </div>
            <div>
                <button onClick={generateDiscountCode}>Get your code!</button>
            </div>
            {code && (
                <div>
                    <h3>Discount Codes:</h3>
                    <p>{code}</p>
                </div>
            )}
        </div>
    )
}

export default Discount;