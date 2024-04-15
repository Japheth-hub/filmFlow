'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import style from './form.module.css'
import { validateMovieForm, validateSelectForm } from './validateMovieForm '
import Swal from 'sweetalert2'
import CheckRole from '@/components/checkRole/checkRole'
import Pill from '@/components/pill/Pill';
import { updateLocaleStorage } from "@/helpers/updateLocaleStorage";

const MovieForm = () => {

  const URL = process.env.NEXT_PUBLIC_URL
  const {user} = useUser();

  const [mediaType, setMediaType] = useState('trailer');
  const [movieName, setMovieName] = useState('');
  const [director, setDirector] = useState('');
  const [genreOptions, setGenreOptions] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]); 
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [description, setDescription] = useState('');
  const [poster, setPoster] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const [errors, setErrors] = useState({});
  const [year, setYear] = useState('');
  const [userRole, setUserRole] = useState('')
  const [userLocalStorage,setUserLocalStorage] = useState({});

  const [mediaURL, setMediaURL] = useState({
    poster: 'https://s3.oss.go.id/oss/logo/notfound.jpg',
    trailer: 'https://www.shutterstock.com/shutterstock/videos/1028480267/preview/stock-footage-file-not-found-glitch-text-abstract-vintage-twitched-k-loop-motion-animation-black-old-retro.webm',
    movie: 'https://www.shutterstock.com/shutterstock/videos/1028480267/preview/stock-footage-file-not-found-glitch-text-abstract-vintage-twitched-k-loop-motion-animation-black-old-retro.webm'
  });
  const [previewData, setPreviewData] = useState({
    name: '',
    director: '',
    countries: [],
    genres: [],
    description: '',
    poster: null,
    trailer: null,
    movie: null,
  });

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (movieName || director || selectedGenres.length || selectedCountries.length || description || poster || trailer || movie || year) {
        event.preventDefault();
        event.returnValue = ''; 
        return '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [movieName, director, selectedGenres, selectedCountries, description, poster, trailer, movie, year]);


  useEffect(() => {
    if(user){
      updateLocaleStorage(user)
    }

    const userstorage =(window.localStorage.getItem('FilmFlowUsr') 
      ? JSON.parse(window.localStorage.getItem('FilmFlowUsr'))
      : null)

      setUserLocalStorage(userstorage);        
      
    }, [user]);


    useEffect(()=>{

      if(userLocalStorage.role) {
          try {
            setUserRole(userLocalStorage.role)
          } catch (error) {
            console.error(error)
          }
        }
    },[userLocalStorage])


  const toggleMediaType = () => {
    setMediaType(prevMediaType => prevMediaType === 'trailer' ? 'movie' : 'trailer');
  };

  useEffect(() => {
    const updateURL = (file, type) => {
      if (file) {
        const newURL = window.URL.createObjectURL(file);
        setMediaURL(prevURLs => ({ ...prevURLs, [type]: newURL }));
        return () => window.URL.revokeObjectURL(newURL);
      }
    };
    const posterCleanup = updateURL(poster, 'poster');
    const trailerCleanup = updateURL(trailer, 'trailer');
    const movieCleanup = updateURL(movie, 'movie');
  
    return () => {
      if (posterCleanup) posterCleanup();
      if (trailerCleanup) trailerCleanup();
      if (movieCleanup) movieCleanup();
    };
  }, [poster, trailer, movie]);

  useEffect(() => {
    axios.get(`${URL}genres`)
      .then(response => {
        const genreNames = response.data.map(genre => genre.name);
        setGenreOptions(genreNames);
      })
      .catch(error => {
        console.error('Error fetching genre options:', error);
      });
      axios.get(`${URL}countries`) 
      .then(response => {
        setCountryOptions(response.data); 
      })
      .catch(error => {
        console.error('Error fetching country options:', error);
      });
  }, []);

  useEffect(() => {
    const validation = validateMovieForm({
      movieName,
      director,
      description,
      poster,
      trailer,
      movie,
      year
    });
    setErrors(validation.errors);
    setPreviewData({
      name: movieName,
      director: director,
      countries: selectedCountries,
      genres: selectedGenres,
      description: description,
      poster: poster,
      trailer: trailer,
      movie: movie,
    });
  }, [movieName, director,  description, poster, trailer, movie, year, selectedGenres, selectedCountries]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); 
    Swal.fire({
      title: 'Enviando formulario...',
      html: `
        <div style="display: flex; justify-content: center; align-items: center;">
          <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
        <img src="https://gamefundpartners.com/wp-content/uploads/2022/04/loading.gif" width="100" height="100" style="margin-right: 15px;">
        <p style="text-align: center; font-size: 16px; margin-top: 15px;">Por favor, espere...</p>`,
      showConfirmButton: false, // Ocultar el botón de confirmación
      allowOutsideClick: false, // Evitar que el usuario cierre la alerta haciendo clic fuera de ella
    });
  
    const validationSelect = validateSelectForm({
      selectedGenres,
      selectedCountries,
    });
    const validation = validateMovieForm({
      movieName,
      director,
      description,
      poster,
      trailer,
      movie,
      year
    });
    
    // Fusionamos los errores de ambas validaciones
    const mergedErrors = {
      ...validationSelect.errors,
      ...validation.errors
    };
  
    // Verificamos si hay errores en la fusión de ambas validaciones
    if (Object.keys(mergedErrors).length > 0) {
      setErrors(mergedErrors);
      setIsLoading(false);
      return;
    }
    try {
      //Promesas relacionadas a Cloudinary:
      const posterData = new Promise((resolve, reject) => {
        const posterReader = new FileReader();
        posterReader.readAsDataURL(poster);
        posterReader.onload = () => resolve(posterReader.result);
        posterReader.onerror = reject;
      });
  
      const trailerData = new Promise((resolve, reject) => {
        const trailerReader = new FileReader();
        trailerReader.readAsDataURL(trailer);
        trailerReader.onload = () => resolve(trailerReader.result);
        trailerReader.onerror = reject;
      });
      
      const movieData = new Promise((resolve, reject) => {
        const movieReader = new FileReader();
        movieReader.readAsDataURL(movie);
        movieReader.onload = () => resolve(movieReader.result);
        movieReader.onerror = reject;
      });
  
      const [posterDataURL, movieDataURL, trailerDataURL] = await Promise.all([posterData, trailerData, movieData]);
      const userSid = user.sid;
      const data = {
        name: movieName,
        director: director,
        genres: selectedGenres.join(','),
        description: description,
        countries: selectedCountries.join(','),
        posterFile: posterDataURL,
        trailerFile: trailerDataURL,
        movieFile: movieDataURL,
        year: year,
        auth: userSid
      };
      const movieResponse = await axios.post(`${URL}movies`, data);
      console.log(movieResponse.data)
      Swal.close();
      if (movieResponse.status === 200) {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'El formulario se envió correctamente.',
        });
        setSuccessMessage('Formulario enviado correctamente');
        setErrorMessage('');
        setMovieName('');
        setDirector('');
        setSelectedGenres([]);
        setDescription('');
        setPoster(null);
        setTrailer(null);
        setMovie(null);
        setMediaURL({poster: 'https://s3.oss.go.id/oss/logo/notfound.jpg',
        trailer: 'https://www.shutterstock.com/shutterstock/videos/1028480267/preview/stock-footage-file-not-found-glitch-text-abstract-vintage-twitched-k-loop-motion-animation-black-old-retro.webm',
        movie: 'https://www.shutterstock.com/shutterstock/videos/1028480267/preview/stock-footage-file-not-found-glitch-text-abstract-vintage-twitched-k-loop-motion-animation-black-old-retro.webm'
      })
        setSelectedCountries([]);
        setYear('');
      } else if (movieResponse.status === 204) {
        Swal.fire({
          icon: 'warning',
          title: '¡Advertencia!',
          text: 'La película ya existe. Cambie su nombre, año o director.',
        });
    } else if (movieResponse.status !== 200 && movieResponse.status !== 204) {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Ocurrió un error al enviar el formulario.',
      });
      console.error('Error sending data:', movieResponse);
      setSuccessMessage('');
      setErrorMessage('Error al enviar datos: ' + movieResponse.statusText);
    }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Ocurrió un error al enviar el formulario.',
      });
      console.error('Error sending data:', error);
      setSuccessMessage('');
      setErrorMessage('Error al enviar datos: ' + error.message);
    }
    setIsLoading(false); 
  };

  const handlePosterChange = (e) => {
    setPoster(e.target.files[0]);
  };
  const handleTrailerChange = (e) => {
    setTrailer(e.target.files[0]);
  };
  const handleMovieChange = (e) => {
    setMovie(e.target.files[0]);
  };

  const toggleGenre = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(selectedGenre => selectedGenre !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };
  const toggleCountry = (country) => {
    if (selectedCountries.includes(country)) {
      setSelectedCountries(selectedCountries.filter(selectedCountry => selectedCountry !== country));
    } else {
      setSelectedCountries([...selectedCountries, country]);
    }
  };

  return (
    <CheckRole userRole={userRole} requiredRoles={["producer","admin"]}>
    <div className={style["movie-form-container"]}>
      <div className={style["form-and-preview-wrapper"]}>
      <div className={style["form-wrapper"]}>
      <h2>Formulario</h2>
      <Link href="/">
        <button className={style["back-button"]}>Ir a home</button>
      </Link>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="form">
          <div className={style["form-group"]}>
            <label htmlFor="movieName" className={style["form-label"]}>Nombre de la Película:</label>
            <input
              type="text"
              id="movieName"
              value={movieName}
              onChange={(e) => setMovieName(e.target.value)}
              className={style["form-input"]}
            />
            {errors.movieName && <p className={style["error-message"]}>{errors.movieName}</p>}
          </div>
          <div className={style["form-group"]}>
            <label htmlFor="director" className={style["form-label"]}>Director:</label>
            <input
              type="text"
              id="director"
              value={director}
              onChange={(e) => setDirector(e.target.value.replace(/\d/g, ''))}
              className={style["form-input"]}
            />
            {errors.director && <p className={style["error-message"]}>{errors.director}</p>}
          </div>
          <div className={style["form-group"]}>
            <label htmlFor="year" className={style["form-label"]}>Año:</label>
            <input
              type="number"
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className={style["form-input"]}
            />
            {errors.year && <p className={style["error-message"]}>{errors.year}</p>}
          </div>
          <div className={style["form-group"]}>
            <label htmlFor="genre" className={style["form-label"]}>Género:</label>
            <select
                id="genre"
                value={selectedGenres}
                onChange={(e) => toggleGenre(e.target.value)}
                className={style["form-input"]}
            >
              <option value="">Selecciona géneros</option>
              {genreOptions.map(genre => (
                <option key={genre} value={genre}>{genre.replace(/\b\w/g, c => c.toUpperCase())}</option>
              ))}
            </select>
            {errors.genre && <p className={style["error-message"]}>{errors.genre}</p>}
            <ul className={style["genre-list"]}>
              {selectedGenres.map(selectedGenre => (
                <li key={selectedGenre}>
                  {selectedGenre.replace(/\b\w/g, c => c.toUpperCase())}{' '}
                  <button type="button" onClick={() => toggleGenre(selectedGenre)}>
                    x
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className={style["form-group"]}>
          <label htmlFor="country" className={style["form-label"]}>Países:</label>
            <select
              id="country"
              value={selectedCountries}
              onChange={(e) => toggleCountry(e.target.value)}
              className={style["form-input"]}
            >
              <option value="">Selecciona país</option>
              {countryOptions.map(country => (
                <option key={country.name} value={country.name}>{country.name.replace(/\b\w/g, c => c.toUpperCase())}</option>
              ))}
            </select>
            {errors.countries && <p className={style["error-message"]}>{errors.countries}</p>}
            <ul className={style["genre-list"]}>
              {selectedCountries.map(selectedCountry => (
                <li key={selectedCountry}>
                  {selectedCountry.replace(/\b\w/g, c => c.toUpperCase())}{' '}
                  <button type="button" onClick={() => toggleCountry(selectedCountry)}>
                    x
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className={style["form-group"]}>
            <label htmlFor="description" className={style["form-label"]}>Breve descripción:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={style["form-input"]}
            ></textarea>
            {errors.description && <p className={style["error-message"]}>{errors.description}</p>}
          </div>
          <div className={style["file-group"]}>
            <div className={style["form-group"]}>
            <label htmlFor="posterFile" className={style["form-label"]}>Seleccionar Póster:</label>
            <div className={style["file-upload-container"]}>
              <input
                type="file"
                id="posterFile"
                onChange={handlePosterChange}
                className={style["form-input"]}
                accept="image/*"
              />
              </div>
              {errors.posterFile && <p className={style["error-message"]}>{errors.posterFile}</p>}
            </div>
            <div className={style["form-group"]}>
              <label htmlFor="trailerFile" className={style["form-label"]}>Seleccionar Trailer:</label>
              <input 
                type="file"
                id="trailerFile"
                onChange={handleTrailerChange}
                className={style["form-input"]}
                accept="video/*"
              />
              {errors.trailerFile && <p className={style["error-message"]}>{errors.trailerFile}</p>}
            </div>
            <div className={style["form-group"]}>
              <label htmlFor="movieFile" className={style["form-label"]}>Seleccionar Película:</label>
              <input
                type="file"
                id="movieFile"
                onChange={handleMovieChange}
                className={style["form-input"]}
                accept="video/*"
              />
              {errors.movieFile && <p className={style["error-message"]}>{errors.movieFile}</p>}
            </div>
          </div>
          <div className={style["submit-button-container"]}>
            <button type="submit" className={style["submit-button"]} disabled={isLoading}>
              {isLoading ? 'Enviando...' : 'Enviar'}
            </button>
          </div>
        </form>
      </div>
      <div>
            <h2>Vista Previa</h2>
      <div className={style['detail-content']}>
        <div className={style['poster-description-container']}>
          <div className={style['container-info']}> 
            <img src={mediaURL.poster} alt={name + ' poster'} className={style['poster-image']} />
            <div className={style["'description-container-info'"]}>
            <span className={style['italic-dark']}><h3>{previewData.name}</h3></span>
            <p><span className={style['italic-dark']}>Dirigida por:</span> {previewData.director}</p>
            <p><span className={style['italic-dark']}>Año:</span> {year}</p>
            <p><span className={style['italic-dark']}>Descripción:</span> {previewData.description}</p>
            <div className={style.genres}>
              {selectedCountries.map((country) => <Pill key={country.id}  emoji={country.flag} label={country} />)}
            </div>
            <div className={style.genres}>
                {selectedGenres.map((genre) => <Pill key={genre.id} emoji={genre.emoji} label={genre}/>)}
            </div>
            </div>
            </div>
          </div>
          <div className={style['media-container']}>
            <button onClick={toggleMediaType}>
              {mediaType === 'trailer' ? 'Ver Película' : 'Ver Trailer'}
            </button>
            {mediaType === 'trailer' ? (
              <iframe src={mediaURL.trailer} width="800" height="500" title="Trailer" allowFullScreen />
            ) : (
              <iframe src={mediaURL.movie} width="800" height="500" title="Movie" allowFullScreen />
            )}
            </div>
        </div>
      </div>
    </div>
   </div>
 </CheckRole>
  );
};
export default withPageAuthRequired(MovieForm);