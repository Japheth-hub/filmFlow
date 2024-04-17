import style from "./Carousel.module.scss";
import { useEffect, useState } from "react";
import CarouselItem from "../carouselItem/CarouselItem";

const Carousel = ({ movie, dim, autoplay }) => {
    const [movieIndex, setMovieIndex] = useState(0);
    const [arrMovie, setArrMovie] = useState(movie);
    const URL = process.env.NEXT_PUBLIC_URL
    
    useEffect(() => {
        setArrMovie(movie)
    }, [movie]);
    
    useEffect(() => {
        if(autoplay){
        const interval = setInterval(() => {
            changeMovie('next')
        }, 1000*autoplay)
        return () => clearInterval(interval);
    }})
    
    const changeMovie = (direct) => {
        if(direct === 'prev'){
            if(movieIndex > 0) return setMovieIndex(movieIndex-1)
            else{
                return  setMovieIndex(arrMovie.length-1);
            }
        }
        else{
            if(movieIndex < arrMovie.length-1) return setMovieIndex(movieIndex+1)
            else{
                return setMovieIndex(0);
            }
        }
    }

    return (
    <div className="container">
        <div className={style.mainContainer}>                
            {arrMovie && arrMovie.length > 0 &&
                <CarouselItem 
                    key={arrMovie[movieIndex].id} 
                    elem={arrMovie[movieIndex]}
                />
            }
            <div className={style.leftArrow} onClick={() => changeMovie('prev')}>&#10092;</div>
            <div className={style.rightArrow} onClick={() => changeMovie('next')}>&#10093;</div>                
        </div>
    </div>
)
}

export default Carousel;