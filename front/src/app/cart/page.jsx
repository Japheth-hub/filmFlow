'use client'
import axios from 'axios';
import React, { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Buy from '../../components/btnBuy/buy'
import style from './cart.module.scss'

const Cart = () => {
    const URL = process.env.NEXT_PUBLIC_URL;
    const { error, isLoading, user } = useUser();
    const [cartData, setCartData] = useState([]);
    
    const userId = "1111"

    const fetchData = async () => {
        try {
            //Usuario de auth0
            const response = await axios.get(`${URL}cart/${user.sid}`);

            //Hardcodeado
            // const response = await axios.get(`${URL}cart/${userId}`);

            setCartData(response.data.movies);
        } catch (error) {
            console.error('Error fetching movie data:', error);
        }
    };
    
    if (!isLoading && cartData.length === 0) {
        fetchData()
    }
    
    const handleDelete = async (id) => {
        try {
            //Usuario de auth0
            const response = await axios.delete(`${URL}cart/${id}`, { data: {auth: user.sid}});

            //Hardcodeado
            // const response = await axios.delete(`${URL}cart/${id}`, { data: {auth: userId}});

            setCartData(cartData.filter(movie => movie.id !== id));
        } catch (error) {
            console.error('Error deleting movie from cart:', error);
        }
    }
    
    if (error) {
        return (
            <div>Error</div>
        )
    }
    if (isLoading) {
        return (
            <div>Loading</div>
        )
    }

    return (
        <div>
            
            <div>
                <div>
                {cartData.map((movie) => (
                    <div key={movie.id}>
                        <img src={movie.poster} alt={movie.name} className={style['movie-poster']} />
                            <div>
                                <p>{movie.name}</p>
                                <button onClick={() => handleDelete(movie.id)}>X</button> 
                            </div>
                    </div>
                ))}
                </div>
                <Buy sid = {user.sid}></Buy>
            </div>
        </div>
    );
};


export default Cart;
