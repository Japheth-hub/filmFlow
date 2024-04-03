'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import style from '../detail.module.scss';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import Pill from '@/components/pill/Pill';
import Button from "../../../components/button/Button";
import AddToCart from '../../../components/addToCart/AddToCart';

const DetailContent = () => {
  const [purchase, setPurchase] = useState([]);
  const { id } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newReview, setNewReview] = useState({ points: 0, comment: '' });
  const [error, setError] = useState(null);
  const [mediaType, setMediaType] = useState('trailer');
  const URL = process.env.NEXT_PUBLIC_URL;
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState('');
  const [reviewsData, setReviewsData] = useState([]);
  const user = checkUserLogin();
  const [review, setReview] = useState({})

  const goToCategory = (genre) => {
    router.push(`/filters/genero=${genre}`);
  };

  function checkUserLogin (){
    const user = window.localStorage.getItem('FilmFlowUsr');
    if(user){
        return JSON.parse(user);
    }else{
        return false
    }
}

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

  useEffect(() => {
    if (movieData) {
      setReviewsData(movieData.reviews || []);
    }
  }, [movieData]);
  
  useEffect(()=>{
    async function getPurchase(){
      const user = JSON.parse(localStorage.getItem('FilmFlowUsr'))
      const {data} = await axios(`${URL}purchases/${user.sid}`)
      if(typeof data === "object"){
        const idsMovies = []
        for(let movie of data){
          idsMovies.push(movie.id)
        }
        setPurchase(idsMovies)
      }
    }
    getPurchase()
    setReview(reviewsData.find((review) => review.user.email ? review.user.email === user.email : review.user.name === user.email))
    }, [reviewsData])

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
  } = movieData;
  
  const handleRatingChange = (rating) => {
    setNewReview({ ...newReview, points: rating });
  };
const renderStarSelector = () => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const filled = i <= newReview.points ? style['filled'] : ''; 
    stars.push(
      <span key={i} className={`${style['star']} ${filled}`} onClick={() => handleRatingChange(i)}>
        &#9733;
      </span>
    );
  }
  return stars;
};
  const handleReviewSubmit = async () => {
    try {
      const userSid = user.sid;
      const movieId = id; 
      const { comment, points } = newReview; 
  

      await axios.post(`${URL}reviews`, { userSid, movieId, comment, points });

      const newReviewData = { id: reviewsData.length + 1, user: { name: user.name, picture: user.picture }, points, comment };
      setReviewsData([...reviewsData, newReviewData]);
      setSuccessMessage('Review submitted successfully.');
      setNewReview({ points: 0, comment: '' });
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div className={style['detail-content']}>
     
      <div className={style['poster-description-container']}>
        <div className={style['container-info']}> 
          <img src={poster} alt={name + ' poster'} className={style['poster-image']} />
          <div className={style['description-container-info']}>
            <span className={style['italic-dark']}><h3>{name}</h3></span>
            <p><span className={style['italic-dark']}>Dirigida por:</span> {director}</p>
            <p><span className={style['italic-dark']}>Duración:</span> {duration} minutes</p>
            <p><span className={style['italic-dark']}>País:</span> {country}</p>
            <p><span className={style['italic-dark']}>Descripción:</span> {description}</p>
            <div className={style.genres}>
              {genres.map((genre) => <Pill key={genre.id} emoji={genre.emoji} label={genre.label} callback={()=>goToCategory(genre.name)}/>)}
            </div>
            {/* {movieData && <AddToCart movie={movieData} />} */}
            {purchase.includes(movieData.id) 
            ? <Button emoji={'✅'} label='Ya tienes esta pelicula'/> 
            : movieData && <AddToCart movie={movieData} />}
            
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
      {purchase.includes(movieData.id) && !review 
        ? <div className={style['review-form-container']}>
            <h4>Leave a Review</h4>
            {successMessage && <div className={style['success-message']}>{successMessage}</div>}
            <div className={style['review-form']}>
              <label>Rating:</label>
              <div className={style['star-selector']}>
                {renderStarSelector()}
              </div>
              <label>Comment:</label>
              <textarea value={newReview.comment} onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })} />
              <button onClick={handleReviewSubmit}>Submit Review</button>
            </div>
          </div>
        : ""
      }
          <h4>Reviews</h4>
        {reviewsData.map((review) => (
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


