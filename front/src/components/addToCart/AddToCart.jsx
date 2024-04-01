import React,{useState} from 'react'
import Button from '../button/Button'
import Image from 'next/image'
import cartIcon from '../../img/cart-icon-white.svg'
import axios from 'axios';
import { useEffect } from 'react';
const URL = process.env.NEXT_PUBLIC_URL;
import { useUser } from '@auth0/nextjs-auth0/client';


export default function AddToCart({movie}) {
    
    const [cart, setCart] = useState([]);
    const [label, setLabel] = useState("Agregar a carrito");
    const [color, setColor] = useState("green");
    const { error, isLoading, user } = useUser();
    const event = new Event('localChanged');
    
    const handleAddCart = ()=>{
        if(!checkMovieCart()){
            addToCartButton();
        }else{
            removeFromCart()
        }
    }

    function checkUserLogin (){
        const auth = localStorage.getItem('FilmFlowUsr');
        if(auth){
            return JSON.parse(auth);
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
        localStorage.setItem("cart", JSON.stringify(newCart));
        window.dispatchEvent(event);
    }
    
    const addToCartButton = async () => {
        if (!user){
            const newCart = [...cart,movie];
            saveCart(newCart);
        }else{
          try {
            const remoteCart = await axios.post(`${URL}cart`, {
                movieId:movie.id,
                auth: user.sid
            });

            saveCart(remoteCart.data.movies);
            
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

            saveCart(remoteCart.data.movies);
           
        }
        
      }

      const fetchData = ()=>{
        const localCart = JSON.parse(window.localStorage.getItem('cart'));
        if(localCart){
            setCart(localCart)
        }else{
            if(user){
                (async()=>{
               
                   try {
                    const remoteCart =  await axios.get(`${URL}cart/${user.sid}`);
                    setCart(remoteCart.data.movies);
        
                   } catch (error) {
                    console.log(error);
                   }
               
                })();
            }
        }
      }

      useEffect(() => {
        if(checkMovieCart()){
            setLabel("-")
            setColor("red");
        }else{
            setLabel("+")
            setColor("green")
        }
      }, [cart]);


      useEffect(() => {
        fetchData();

        const handleStorageChange = (event) => {
            fetchData();
        };
    
        // Agregar el evento de escucha para cambios en el almacenamiento local
        window.addEventListener('localChanged', handleStorageChange);

        // Eliminar el evento de escucha al desmontar el componente
        return () => {
            window.removeEventListener('localChanged', handleStorageChange);
        };

        
        
      }, [])

  return (
    <Button color={color} emoji={<Image alt="" src={cartIcon}/>}  label={label} callback={handleAddCart}/>
  )
}
