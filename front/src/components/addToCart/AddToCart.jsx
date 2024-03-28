import React,{useState} from 'react'
import Button from '../button/Button'
import Image from 'next/image'
import cartIcon from '../../img/cart-icon-white.svg'
import axios from 'axios';
import { useEffect } from 'react';
const URL = process.env.NEXT_PUBLIC_URL;

export default function AddToCart({movie}) {

    const [cart, setCart] = useState([]);
    const [label, setLabel] = useState("Agregar a carrito");
    const user = checkUserLogin();
    const handleAddCart = ()=>{
        if(!checkMovieCart()){
            addToCart();
        }else{
            removeFromCart()
        }
    }

    function checkUserLogin (){
        const user = window.localStorage.getItem('FilmFlowUsr');
        if(user){
            return JSON.parse(user);
        }else{
            return false
        }
    }

    const checkMovieCart = ()=>{
        const search = cart.find((item)=>{
            return item.id === movie.id;
        })
        if(search){
            return true
        }else{
            return false
        }   
      
    }

    const saveCart = (newCart)=>{
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    }
    const addToCart = async () => {
        if (!user){
            const newCart = [...cart,{...movie}];
            saveCart(newCart)
        }else{
          
          try {
            const remoteCart = await axios.post(`${URL}cart`, {
                movieId:movie.id,
                auth: user.sid
            });

            setCart(remoteCart.data.movies);
            
          } catch (error) {
            console.error('Error adding movie to cart:', error);
            alert('An error occurred while adding the movie to the cart.');
          }
        }
      };

      const removeFromCart = async ()=>{
        if(!user){
            const newCart = [...cart].filter((item)=>{
                return item.id !== movie.id;
            })
            saveCart(newCart);
        }else{
            const remoteCart = await axios({
                url:`${URL}cart/${movie.id}`,
                method:'delete',
                data : {auth: user.sid},
                headers:{}
              });

            setCart(remoteCart.data.movies);
           
        }
        
      }

      useEffect(() => {
        if(checkMovieCart()){
            setLabel("Quitar del carrito")
        }else{
            setLabel("Agregar al carrito")
        }
        console.log(cart);
      }, [cart]);


      useEffect(() => {
        if(!user){

            const localCart = JSON.parse(window.localStorage.getItem('cart'))
            if(localCart){
                setCart(localCart)
            }
        }else{
            (async()=>{
           
               try {
                const remoteCart =  await axios.get(`${URL}cart/${user.sid}`);
                setCart(remoteCart.data.movies);
    
               } catch (error) {
                console.log(error);
               }
           
            })();
        }
        
        
      }, [])
      
  return (
    <Button emoji={<Image alt="" src={cartIcon}/>}  label={label} callback={handleAddCart}/>
  )
}
