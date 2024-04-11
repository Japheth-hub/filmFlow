'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'

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

 ///dudoso seguramente borrar 
    const deleteDiscount = async (code) => {
        try {
            const currentDate = new Date(); 
            const isosDate = currentDate.toISOString(); 
            await axios.put(`${URL}discount/${code}`, { usedAt: isosDate });
            
            setDiscounts((prevDiscounts) =>
                prevDiscounts.map((discount) =>
                    discount.code === code ? { ...discount, usedAt: isosDate } : discount
                )
            );
        } catch (error) {
            console.error('Error deleting discount:', error);
        }
    };
    

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
                    percentage: percentage,
                    starts,
                    ends
                });

                setCode(response.data.code.code);
                setDiscounts((prevDiscounts) => [...prevDiscounts, response.data.code]);
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
                    onChange={(e) => setPercentage(parseInt(e.target.value))}
                />

            </div>
            <div>
                <label htmlFor="startsDate">Start Date:</label>
                <input
                    type="date"
                    id="startsDate"
                    value={starts.substr(0, 10)} 
                    onChange={(e) => setStarts(e.target.value + 'T12:00:00Z')} 
                />
                <input
                    type="time"
                    value={starts.substr(11, 5)} 
                    onChange={(e) => setStarts(`${starts.substr(0, 10)}T${e.target.value}:00Z`)}
                />
            </div>
            <div>
                <label htmlFor="endsDate">End Date:</label>
                <input
                    type="date"
                    id="endsDate"
                    value={ends.substr(0, 10)} 
                    onChange={(e) => setEnds(e.target.value + 'T12:00:00Z')} 
                />
                <input
                    type="time"
                    value={ends.substr(11, 5)} 
                    onChange={(e) => setEnds(`${ends.substr(0, 10)}T${e.target.value}:00Z`)} 
                />
            </div>




            <div>
                <button onClick={generateDiscountCode}>Get your code!</button>
            </div>
            {code && (
                <div>
                    <h3>New Code:</h3>
                    <p>{code}</p>
                </div>
            )}

            <h2>Discount codes</h2>
            
            {discounts.map((discount,index)=>      
                <div key={discount.id}>
                    <p>Code: {discount.code ? discount.code : discount.id}</p>
                    <p>Percentage: {discount.percentage}</p>
                    <p>Starts: {discount.starts}</p>
                    <p>Ends: {discount.ends}</p>
                    <p>-----------</p>
                </div>
            )}


        </div>
    )
}

export default Discount;