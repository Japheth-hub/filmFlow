'use client'
import axios from 'axios';
import React, { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Buy from '../../components/btnBuy/buy'
import style from './cart.module.scss'
import Link from 'next/link';

const Cart = () => {
    const URL = process.env.NEXT_PUBLIC_URL;
    const { error, isLoading, user } = useUser();
    const [cartData, setCartData] = useState([]);
    const totalPrice = cartData.reduce((total, movie) => total + movie.price, 0);

    
    // const userId = "1111"

    const fetchData = async () => {
        try {
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
        <div className={style.pageContainer}>
            <div className={style.cartContainer}> 
        <Link href="/home">
            <button>Ir a home</button>
        </Link>
            <div className={style.cartList}> 
            {cartData.map((movie) => (
                <div key={movie.id} className={style.cartItem}> 
            <img src={movie.poster} alt={movie.name} className={style.moviePoster} />
                <div className={style.itemDetails}> 
                    <p>{movie.name}</p>
                </div>
                <div className={style.priceButtonContainer}> 
                    <div className={style.price}>
                    <p>{movie.price}$</p>
                    </div>
                    <button className={style.buttonDelete} onClick={() => handleDelete(movie.id)}>X</button>
                </div>
                </div>
            ))}
            <div className={style.totalPrice}>
            <p>Total: {totalPrice}$</p>
            </div>
            </div>
            <div className={style.buy}> 
            <Buy sid = {user.sid}></Buy>
            </div>
        </div>
    </div>
    );
};

export default Cart;
