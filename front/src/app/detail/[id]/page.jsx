'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import style from '../detail.module.css';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const DetailContent = () => {
  const { id } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mediaType, setMediaType] = useState('trailer');
  const URL = process.env.NEXT_PUBLIC_URL;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${URL}movies/${id}`);
        setMovieData(response.data);
      } catch (error) {
        console.error('Error fetching movie data:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const addToCart = async () => {
    try {
      await axios.post(`${URL}cart`, {
        movieId: id,
        auth: '3333'
      });
      alert('Movie added to cart successfully!');
    } catch (error) {
      console.error('Error adding movie to cart:', error);
      alert('An error occurred while adding the movie to the cart.');
    }
  };

  const capitalize = (string) => {
    return string.toUpperCase();
  };

  const toggleMediaType = () => {
    setMediaType(prevMediaType => prevMediaType === 'trailer' ? 'movie' : 'trailer');
  };

  if (isLoading) {
    return <div>Loading movie details...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!movieData) {
    return <div>No movie data found.</div>;
  }

  const {
    name,
    poster,
    trailer,
    movie, 
    director,
    description,
    duration,
    country,
    genres,
    reviews,
  } = movieData;

  return (
    <div className={style['detail-content']}>
      <Link href="/home">
        <button className={style['back-button']}>Ir a home</button>
      </Link>
      <div className={style['poster-description-container']}>
        <div className={style['container-info']}> 
          <img src={poster} alt={name + ' poster'} className={style['poster-image']} />
          <div className={style['description-container-info']}>
            <span className={style['italic-dark']}><h3>{name}</h3></span>
            <p><span className={style['italic-dark']}>Directed by:</span> {director}</p>
            <p><span className={style['italic-dark']}>Duration:</span> {duration} minutes</p>
            <p><span className={style['italic-dark']}>Country:</span> {country}</p>
            <p><span className={style['italic-dark']}>Description:</span> {description}</p>
            <p><span className={style['italic-dark']}>Genres:</span> {genres.map((genre) => capitalize(genre.name)).join(', ')}</p>
            <button className={style['back-button']} onClick={addToCart}>Agregar al carrito</button>
          </div>
        </div>
      </div>
      <div className={style['media-container']}>
        <button onClick={toggleMediaType}>
          {mediaType === 'trailer' ? 'Ver Película' : 'Ver Trailer'}
        </button>
        {mediaType === 'trailer' ? (
          <iframe src={trailer} width="800" height="500" title="Trailer" allowFullScreen />
        ) : (
          <iframe src={movie} width="800" height="500" title="Movie" allowFullScreen />
        )}
      </div>
      <h4>Reviews</h4>
      {reviews.map((review) => (
        <div key={review.id} className={style['review-container']}>
          <img src={review.user.picture} alt={review.user.name} className={style['user-picture']} />
          <div className={style['review-content']}>
            <div className={style['star-rating']} data-rating={review.points}>
            <span className={style['italic-dark']}><p>{review.user.name}</p></span>
              {[...Array(review.points)].map((_, index) => (
                <span key={index} className={style['filled']}>&#9733;</span>
              ))}
            </div>
            <p>{review.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DetailContent;


