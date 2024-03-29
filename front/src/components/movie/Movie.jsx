import style from "./Movie.module.scss"
import Link from "next/link";
import AddToCart from '../addToCart/AddToCart';
import { useEffect } from 'react';
import axios from 'axios';
import React,{useState} from 'react'
import Button from "../button/Button";
import { useUser } from '@auth0/nextjs-auth0/client';


const URL = process.env.NEXT_PUBLIC_URL;

const Movie = ({ elem, dim }) => {
    const { error, isLoading, user } = useUser();
    const [purchase, setPurchase] = useState([]);

    const title = (title)=>{
        if(title){
            return title.length >=15 ? title.slice(0,15)+"...":title;
        }
    }

    useEffect(()=>{
        if(user){
            async function getPurchase(){
                try { 
                    const {data} = await axios(`${URL}purchases/${user.sid}`)
                    if(typeof data === "object"){
                        const idsMovies = []
                        for(let movie of data){
                            idsMovies.push(movie.id)
                        }
                        setPurchase(idsMovies)
                    }
                } catch (error) {
                        console.log(error);
                }
            }
            getPurchase()
        }
    }, [user])

    return(
        <div key={elem.id} className={style.card} >
            <Link href={`/detail/${elem.id}`} key={elem.id}>
                <div className={style.image}>
                    <img 
                        src={elem.poster}
                        width={dim ? dim[0] : '200px'}
                        height={dim ? dim[1] : '300px'}
                    />
                    <div className={style.info}>
                        <div>{title(elem.name)}</div>
                    </div>
                </div>

            </Link>

            {purchase.includes(elem.id) ? <Link href={`detail/${elem.id}`}><Button emoji={'✅'} label='Ver Pelicula'/></Link> : <div><AddToCart movie={elem} /></div>}
            

        </div>
    )
}

export default Movie;
