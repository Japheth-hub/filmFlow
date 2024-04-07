'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Discount = () =>{
    const URL = process.env.NEXT_PUBLIC_URL
    const [code,setCode] = useState('')
    const [generatedCodes, setGeneratedCodes] = useState({});
    const [selectedMovies, setSelectedMovies] = useState(null); // State to track selected movie
    const [selectedGenres, setSelectedGenres] = useState([])
    const [movieNames, setMovieNames] = useState([]); 
    const [genreNames, setGenreNames] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            try {
                const moviesRes = await axios.get(`${URL}movies`);
                const movieName = moviesRes.data.map(movie => movie.name);
                setMovieNames(movieName);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };
      
        getMovies();
    }, []);

    useEffect(() => {
        const getGenres = async () => {
            try {
                const genresRes = await axios.get(`${URL}genres`);
                const genreName = genresRes.data.map(genre => genre.name);
                setGenreNames(genreName);
            } catch (error) {
                console.error("Error fetching genres:", error);
            }
        };
      
        getGenres();
    }, []);
    
    const generateCode = () => {
        let genCode;

        do {
          genCode = coupon.generate(); 
        } while (generatedCodes.hasOwnProperty(genCode)); 

        const discount = 0.15 //15%- hacer variable? 

        console.log("code:", genCode);

        setCode(genCode); 
        setGeneratedCodes(prevCodes => ({
            ...prevCodes,
            [genCode]: { discount, movies: selectedMovies, genres: selectedGenres } 
        }));
    };
    
    //va en el carrito creo PREG
    const removeCode = (codeToRemove) => {
        const updatedCodes = { ...generatedCodes };
        delete updatedCodes[codeToRemove];
        setGeneratedCodes(updatedCodes);
    };

    const handleMovieSelection = (e) => {
        const selectedCheckboxValues = Array.from(document.querySelectorAll('input[type=checkbox]:checked')).map(checkbox => checkbox.value);
        setSelectedMovies(selectedCheckboxValues);
    };
    
    return(
        //navbar
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Movie Name</th>
                        <th>Select</th> {/* New column for checkboxes */}
                    </tr>
                </thead>
                <tbody>
                    {movieNames.map((movieName, index) => (
                        <tr key={index}>
                            <td>{movieName}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    value={movieName}
                                    onChange={handleMovieSelection}
                                />
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td>Genres</td>
                        <td>
                            <select
                                multiple
                                value={selectedGenres}
                                onChange={(e) => setSelectedGenres(Array.from(e.target.selectedOptions, option => option.value))}
                            >
                                {genreNames.map((genreName, index) => (
                                    <option key={index} value={genreName}>{genreName}</option>
                                ))}
                            </select>
                        </td>
                    </tr>           

                </tbody>
            </table>


            <p>Generate a discount code {"-->"}</p>
            <button onClick={generateCode}>click me!</button>

            {/* lista de muestra!*/}
            <p>Generated codes:</p>
            <ul>
                {Object.entries(generatedCodes).map(([code, { discount, movies, genres }], index) => (
                    <li key={index}>
                        {code} (Discount: {discount * 100}%) 
                        {movies && movies.length > 0 && (
                            <>
                                for Movies: {movies.join(', ')} 
                                <button onClick={() => removeCode(code)}>Use Code</button>
                            </>
                        )}
                        {genres && genres.length > 0 && (
                            <>
                                for Genres: {genres.join(', ')} 
                                <button onClick={() => removeCode(code)}>Use Code</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>


            
        </div>
        //footer
    )
}

export default Discount;