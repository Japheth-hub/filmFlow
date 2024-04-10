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
    const [userDiscountCode, setUserDiscountCode] = useState('');
    const [discountApplied, setDiscountApplied] = useState(false);


    const fetchMoviePercentage = async (movieId) => {
        try {
            const response = await axios.get(`${URL}discount/movie/${movieId}`);

            const discounts = response.data.discounts;

            if (discounts.length > 0) {
                return discounts[0];
            } else {
                return null; 
            }
        } catch (error) {
            console.error('Error fetching movie discount percentage:', error);
            return null;
        }
    };
    

    const fetchGenrePercentage = async (genreCode) => {
        try {
            const response = await axios.get(`${URL}discount/genre/${genreCode}`);
            const discounts = response.data.discounts;
            if (discounts.length > 0) {
                return discounts[0].percentage;
            } else {
                return null; 
            }
        } catch (error) {
            console.error('Error fetching genre discount percentage:', error);
            return null;
        }
    
    };
    
    
    

    const fetchData = async () => {
        console.log("fetching data");
        try {
            const localCart =  typeof window !== "undefined" ? JSON.parse(window.localStorage.getItem('cart')): null;
            console.log(localCart);
            if(user){
                console.log("Hay usuario");
                try {
                    const syncData = await axios.post(`${URL}cart`,{
                        movies:localCart,
                        auth: user.sid
                    });
                    if(typeof window !== "undefined"){
                        window.localStorage.setItem(
                            'cart', JSON.stringify(syncData.data.movies)
                          )
                    }
                   
                    setCartData(syncData.data.movies);
                } catch (error) {
                    console.log(error);
                }
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

    const applyDiscountToCart = (movie, discounts) => {
        if (discounts && discounts.code && discounts.percentage !== undefined) {
            if (discounts.code === userDiscountCode) {
                const discountedPrice = movie.price * (1 - discounts.percentage / 100);
                return { ...movie, price: discountedPrice };
            }
        }
        return movie;
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const movieDiscounts = await Promise.all(
                cartData.map((movie) => fetchMoviePercentage(movie.id))
            );
    
            const updatedCart = cartData.map((movie, index) => {
                const discounts = movieDiscounts[index]; 
                return applyDiscountToCart(movie, discounts); 
            });
    
            setCartData(updatedCart); 
            setDiscountApplied(true);
        } catch (error) {
            console.error('Error applying discounts:', error);
        }
    };
    

    
    
    
    
        
    useEffect(() => {
        fetchData();
        const handleStorageChange = (event) => {
            fetchData();
        };

        console.log(cartData);
        if(typeof window !== "undefined"){

            window.addEventListener('localChanged', handleStorageChange);
            return () => {
                window.removeEventListener('localChanged', handleStorageChange);
            };
        }
        
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
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={userDiscountCode}
                    onChange={(e) => setUserDiscountCode(e.target.value)}
                    placeholder="Enter discount code"
                />
                <button type="submit">Apply Discount</button>
            </form>
            {discountApplied && <p>Discount applied successfully!</p>}

        </div>
    </div>
    );
};

export default Cart;
