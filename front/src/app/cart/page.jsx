'use client'
import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Buy from '../../components/btnBuy/buy'
import style from './cart.module.scss'
import Link from 'next/link';
import AddToCart from '../../components/addToCart/AddToCart'
import Button  from '@/components/button/Button';
import Loading from "@/components/loading/loading";

const Cart = () => {
    const URL = process.env.NEXT_PUBLIC_URL;
    const { error, isLoading, user } = useUser();
    const [cartData, setCartData] = useState([]);
    const [localStorageData, setLocalStorageData] = useState(null);
    const [totalPrice,setTotalPrice] = useState(null);
    const [userDiscountCode, setUserDiscountCode] = useState('');
    const [discountApplied, setDiscountApplied] = useState(false);
    const [discountError, setDiscountError] = useState('')
    const event = new Event('localChanged');

    const fetchData = async () => {
        try {
            const localCart =  typeof window !== "undefined" ? JSON.parse(window.localStorage.getItem('cart')): null;
            if(user){
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
  
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post(`${URL}discount/apply`,{
                code:userDiscountCode,
                movies:cartData
            });
            setCartData(data.movies);
            setDiscountApplied(true);
            setDiscountError('')
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setDiscountError(error.response.data.message);
            } else {
                setDiscountError('Ha ocurrido un error inesperado.');
            }
            console.error('Error applying discounts:', error);
        }
    };
    

    
    
    
    
        
    useEffect(() => {
        fetchData();
        
        const handleStorageChange = (event) => {
            fetchData();
        };
        if(typeof window !== "undefined"){

            window.addEventListener('localChanged', handleStorageChange);
            return () => {
                window.removeEventListener('localChanged', handleStorageChange);
            };
        }

        return () => {
            setCartData([]);
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
        return <Loading></Loading>;
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
            {user ? <Buy cart={cartData} code={userDiscountCode} sid = {user.sid}/>: <Link href="/api/auth/login"><Button label="loggeate"/></Link>}
            
            </div>
            
            <form onSubmit={handleSubmit} className={style.discountForm}>
            <input
                type="text"
                value={userDiscountCode}
                onChange={(e) => setUserDiscountCode(e.target.value)}
                placeholder="Escriba el código de descuento"
                className={style.input}
            />
            <Button label="Aplicar descuento" color="primary" callback={handleSubmit}/>
            {userDiscountCode && discountError && <p className={style.errorMessage}>{discountError}</p>}
            {userDiscountCode && discountApplied && <p className={style.successMessage}>¡Descuento aplicado!</p>}            
            </form>

        </div>
    </div>
    );
};

export default Cart;
