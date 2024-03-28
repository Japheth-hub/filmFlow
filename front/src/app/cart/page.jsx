'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Cart = () => {

    const URL = process.env.NEXT_PUBLIC_URL;

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [cartData, setCartData] = useState(null);
    const userId = "3333"

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${URL}cart/${userId}`);
                console.log(response)
                setCartData(response.movies);
            } catch (error) {
                console.error('Error fetching movie data:', error);
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [userId]);

    const handleDelete = async (id) => {
        const response = await axios.delete(`${URL}cart/${id}`)
    }

    return (
        <div>
            <div>
                <div className='container'>
                {cartData.map((movie) => (
                    <div key={movie.id} className={style['review-container']}>
                        <img src={movie.poster} alt={movie.name} className={style['user-picture']} />
                            <div className={style['review-content']}>
                                <p>{movie.name}</p>
                                <button onClick={handleDelete(movie.id)}>X</button>
                            </div>
                    </div>
                ))}
                </div>
                <button>Validar carrito</button>
            </div>
        </div>
    );
};


export default Cart;