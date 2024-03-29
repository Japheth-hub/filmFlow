'use client'
import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Buy from '../../components/btnBuy/buy'
import style from './cart.module.scss'
import Link from 'next/link';
import AddToCart from '../../components/addToCart/AddToCart'
import Button  from '@/components/button/Button';

const Cart = () => {
    const URL = process.env.NEXT_PUBLIC_URL;
    const { error, isLoading, user } = useUser();
    const [cartData, setCartData] = useState([]);
    const [localStorageData, setLocalStorageData] = useState(null);
    const [totalPrice,setTotalPrice] = useState(null);



    const fetchData = async () => {
        console.log("fetching data");
        try {
            const localCart = JSON.parse(window.localStorage.getItem('cart'));
            if(user){
                console.log("Hay usuario");
                const syncData = await axios.post(`${URL}cart`,{
                    movies:localCart,
                    auth: user.sid
                });
                setCartData(syncData.data.movies);
            }else{
                if(localCart){
                    setCartData(localCart)
                }
            }
        

            

        } catch (error) {
            console.error('Error fetching movie data:', error);
        }
    };
  
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

    useEffect(() => {
        fetchData();
        const handleStorageChange = (event) => {
            fetchData();
        };

        console.log(cartData);
    
        window.addEventListener('localChanged', handleStorageChange);
        
        return () => {
            window.removeEventListener('localChanged', handleStorageChange);
        };
      }, []);

      useEffect(() => {
        fetchData();
        
      }, [user]);

      useEffect(() => {
        setTotalPrice(cartData.reduce((total, movie) => total + movie.price, 0));
      }, [cartData])
      
      
    
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
                <Link href="/">
                    <Button label="ir a home" emoji="🏠" />
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
                    <AddToCart movie={movie}/>
                </div>
                </div>
            ))}
            <div className={style.totalPrice}>
            <p>Total: {totalPrice}$</p>
            </div>
            </div>
            <div className={style.buy}> 
            {user ? <Buy sid = {user.sid}/>: <Link href="/api/auth/login"><Button label="loggeate"/></Link>}
            
            </div>
        </div>
    </div>
    );
};

export default Cart;
