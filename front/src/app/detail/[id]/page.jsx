'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import userpic from "@/img/userpic.png";
import style from '../detail.module.scss';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import Pill from '@/components/pill/Pill';
import Button from "../../../components/button/Button";
import AddToCart from '../../../components/addToCart/AddToCart';
import { useUser } from '@auth0/nextjs-auth0/client'; 
import Swal from "sweetalert2";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import validateReview from "@/helpers/validateReview";


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
  const {user} = useUser();
  const [review, setReview] = useState()
  const [display, setDisplay] = useState('none')
  const [update, setUpdate] = useState(true)
  const [idReview, setIdReview] = useState()
  const [alerts, setAlerts] = useState({points: true, comment: true})
  const [hasMovie, setHasMovie] = useState(false);
  

  const goToCategory = (genre) => {
    router.push(`/movies?genre=${genre}`);
  };
  const goToCountry = (country) => {
    router.push(`/movies?country=${country}`);
  };

  function showModal(valor, id) {
    setDisplay(valor);
    setIdReview(id)
    setAlerts({ points: true, comment: true });

  }

  async function deleteReview(id){
    try {
      const res = await Swal.fire({
        icon: "warning",
        title: "¿Estás seguro?",
        text: "Estas seguro que deseas eliminar tu comentario",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "Cancelar",
      });

      if (res.isConfirmed) {
        const {data} = await axios.delete(`${URL}reviews/${id}`)
        setUpdate(!update)
        Swal.fire({
          icon: "success",
          title: "¡Éxito!",
          text: data.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: error || "Ocurrió un error al eliminar la información.",
      });
    }
  }
  
  async function fetchData() {
    setIsLoading(true);
    setError(null);

    try {
      let query = "";
      if (user) {
        query = `?auth=${user.sid}`;
      }
      const response = await axios.get(`${URL}movies/${id}${query}`);
      if(!response.data.isOwner && !response.data.isAdmin && response.data.status !== "approved") {
        router.push(`/`);
      } 
      setMovieData(response.data);
      if (response.data && response.data.id && purchase.includes(response.data.id)) {
        setHasMovie(true);
      } else {
        setHasMovie(false);
      }
    } catch (error) {
      console.error('Error fetching movie data:', error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }


  useEffect(() => {
    fetchData();
  }, [id, user,update]);

  
  useEffect(() => {
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
        console.error('Error fetching purchase data:', error);
      }
    }
    if(user){
      getPurchase()
    }
    
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
    countries,
    genres,
    year,
  } = movieData;

  // const country = countries.map(country => country.name.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '));

  const country = ""; 
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
      const data = await validateReview(points, comment)
      if(data.points === true && data.comment === true){
        await axios.post(`${URL}reviews`, { userSid, movieId, comment, points });
        setUpdate(!update)
        setNewReview({ points: 0, comment: '' });
      }
      setAlerts({ points: data.points, comment: data.comment });
      setTimeout(() => {
        setAlerts({ points: true, comment: true });
      }, 3000);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  async function handleUpdate(id){
    try {
      const { comment, points } = newReview; 
      const data = await validateReview(points, comment)
      if(data.points === true && data.comment === true){
        await axios.put(`${URL}reviews/${id}`, { comment, points });
          setAlerts({ points: true, comment: true });
          setUpdate(!update)
          setDisplay('none')
          setNewReview({ points: 0, comment: "" });
        }
        setAlerts({ points: data.points, comment: data.comment });
        setTimeout(() => {
          setAlerts({ points: true, comment: true });
        }, 3000);
    } catch (error) {
      console.log("Error al actualizar",error)
    }
  }



  return (
    <div className={style['detail-content']}>
    
      <div className={style['poster-description-container']}>
        <div className={style['container-info']}> 
          <img src={poster} alt={name + ' poster'} className={style['poster-image']} />
          <div className={style['description-container-info']}>
            <span className={style['italic-dark']}><h3>{name}</h3></span>
            <p><span className={style['italic-dark']}>Dirigida por:</span> {director}</p>
            <p><span className={style['italic-dark']}>Duración:</span> {duration} minutes</p>
            <p><span className={style['italic-dark']}>Descripción:</span> {description}</p>
            <p><span className={style['italic-dark']}>Año:</span> {year}</p>
            <div className={style.genres}>
              {countries.map((country) => <Pill key={country.id}  emoji={country.flag.replace(/-/g, '')} label={country.name} callback={()=>goToCountry(country.name)}/>)}
            </div>
            <div className={style.genres}>
              {genres.map((genre) => <Pill key={genre.id} emoji={genre.emoji} label={genre.label} callback={()=>goToCategory(genre.name)}/>)}
            </div>
            {purchase.includes(movieData.id) 
            ? <Button emoji={'✅'} label='Ya tienes esta pelicula'/> 
            : movieData && <AddToCart movie={movieData} />}
          </div>
            <FacebookShareButton
              url="https://filmflow.chekogarcia.com.mx/">
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <WhatsappShareButton
              url="https://filmflow.chekogarcia.com.mx/">
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <TwitterShareButton
              url="https://filmflow.chekogarcia.com.mx/">
              <TwitterIcon size={32} round />
            </TwitterShareButton>
        </div>
      </div>
      <div className={style['media-container']}>
<<<<<<< HEAD
      {purchase.includes(movieData.id) &&
=======
>>>>>>> bf7e4fa95460c9c48115e5b3afdec8c2196f560b
        <button onClick={toggleMediaType}>
          {mediaType === 'trailer' ? 'Ver Película' : 'Ver Trailer'}
        </button>
      }
        {mediaType === 'trailer' ? (
          <iframe src={trailer} width="800" height="500" title="Trailer" allowFullScreen />
        ) : (
          <iframe src={movie} width="800" height="500" title="Movie" allowFullScreen />
        )}
      </div> 

      {movieData.reviewPermission && 
          <div className={style['review-form-container']}>
            <h4>Deja un comentario</h4>
            {successMessage && <div className={style['success-message']}>{successMessage}</div>}
            <div className={style['review-form']}>
              <div className={style['star-selector']}>
                {alerts.points !== true && <span className={style.alerts}>{alerts.points}</span>}
                <div className={style.reviewPoints}>
                  <label>Puntuación:</label>
                  {renderStarSelector()}
                </div>
              </div>
              <div className={style.reviewComment}>
                {alerts.comment !== true && <span className={style.alerts}>{alerts.comment}</span>}
                <div className={style.textarea}>
                  <label>Comentario:</label>
                  <textarea rows='5' cols='40' value={newReview.comment} onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })} />
                </div>
              </div>
              <div className={style.comentar}>
                <Button label={'Comentar'} color={'green'} callback={handleReviewSubmit}/>
              </div>
            </div>
          </div>
        }
        {movieData.reviews && movieData.reviews.length > 0 && (
            <h4>Comentarios</h4>
          )}
        {movieData.reviews && movieData.reviews.map((review) => (
          <div key={review.id} className={style['review-container']}>
            <img src={review.user?.picture ? review.user.picture : userpic.src} alt={review.user?.name ? review.user.name : "Desconocido"} className={style['user-picture']} />
            <div className={style['review-content']}>
              <div className={style['star-rating']} data-rating={review.points}>
                <span className={style['italic-dark']}><p>{review.user?.name ? review.user.name : "Desconocido"}</p></span>
                {[...Array(review.points)].map((_, index) => (
                  <span key={index} className={style['filled']}>&#9733;</span>
                ))}
              </div>
              <p>{review.comment}</p>
            </div>
                {user && user.email === review.user.email  && 
                    <div>
                      <Button emoji={'✏️'} color={'green'} callback={()=>{showModal('block', review.id)}}></Button>
                      <Button emoji={'🗑️'} color={'red'} callback={()=>{deleteReview(review.id)}}></Button>
                    </div>
                }
            
          </div>
        ))}
      <div className={style.modalContainer} style={{display : display}}>
        <div className={style.modal}>
          <h4>Actualizar Comentario</h4>
          {successMessage && <div className={style['success-message']}>{successMessage}</div>}
          <div className={style['review-form']}>
            <div className={style['star-selector']}>
              {alerts.points !== true && <span className={style.alerts}>{alerts.points}</span>}
              <div className={style.reviewPoints}>
                <label>Puntuación:</label>
                {renderStarSelector()}
              </div>
            </div>
            <div className={style.reviewComment}>
              {alerts.comment !== true && <span className={style.alerts}>{alerts.comment}</span>}
              <label>Comentario:</label>
              <textarea rows='10' cols='40' value={newReview.comment} onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })} />
            </div>
            <div className={style.reviewBtn}>
              <Button label={'Actualizar'} color={'green'} callback={()=>{handleUpdate(idReview)}}/>
              <Button label={'Cerrar'} color={'red'} callback={()=>{showModal('none')}} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailContent;