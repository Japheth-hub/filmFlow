'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import style from './form.module.css'
import { validateMovieForm } from './validateMovieForm '

const MovieForm = () => {

  const URL = process.env.NEXT_PUBLIC_URL

  const [movieName, setMovieName] = useState('');
  const [director, setDirector] = useState('');
  const [genreOptions, setGenreOptions] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [description, setDescription] = useState('');
  const [poster, setPoster] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState(null);
  const [country, setCountry] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get(`${URL}genres`)
      .then(response => {
        const genreNames = response.data.map(genre => genre.name);
        setGenreOptions(genreNames);
      })
      .catch(error => {
        console.error('Error fetching genre options:', error);
      });
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'movieName') setMovieName(value);
    else if (name === 'director') setDirector(value);
    else if (name === 'description') setDescription(value);
    else if (name === 'country') setCountry(value);
  };
  useEffect(() => {
    const validation = validateMovieForm({
      movieName,
      director,
      selectedGenres,
      description,
      country,
      poster,
      trailer,
      movie, 
      year
    });
    setErrors(validation.errors);
  }, [movieName, director, selectedGenres, description, country, poster, trailer, movie, year]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); 
    const validation = validateMovieForm({
      movieName,
      director,
      selectedGenres,
      description,
      country,
      poster,
      trailer,
      movie
    });
    
    if (Object.keys(validation.errors).length > 0) {
      setErrors(validation.errors);
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

  
      const data = {
        name: movieName,
        director: director,
        genres: selectedGenres.join(','),
        description: description,
        country: country,
        posterFile: posterDataURL,
        trailerFile: trailerDataURL,
        movieFile: movieDataURL,
        auth:"3333"
      };
      
      const movieResponse = await axios.post(`${URL}movies`, data);
      console.log(movieResponse.data);
      setSuccessMessage('Formulario enviado correctamente');
      setErrorMessage('');
      console.log('Server response:', movieResponse);
      setMovieName('');
      setDirector('');
      setSelectedGenres([]);
      setDescription('');
      setPoster(null);
      setTrailer(null);
      setMovie(null);
      setCountry('');
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage('Error al enviar datos: ' + error.message);
      console.error('Error sending data:', error);
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
  return (
    <div className={style["movie-form-container"]}>
      <div className={style["form-wrapper"]}>
      <Link href="/">
        <button className={style["back-button"]}>Ir a home</button>
      </Link>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form onSubmit={handleSubmit} className="form">
          <div className={style["form-group"]}>
            <label htmlFor="movieName" className={style["form-label"]}>Nombre de la Película:</label>
            <input
              type="text"
              id="movieName"
              value={movieName}
              onChange={(e) => setMovieName(e.target.value)}
              className={style["form-input"]}
              // required
            />
            {errors.movieName && <p className={style["error-message"]}>{errors.movieName}</p>}
          </div>
          <div className={style["form-group"]}>
            <label htmlFor="director" className={style["form-label"]}>Director:</label>
            <input
              type="text"
              id="director"
              value={director}
              onChange={(e) => setDirector(e.target.value)}
              className={style["form-input"]}
              // required
            />
            {errors.director && <p className={style["error-message"]}>{errors.director}</p>}
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
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
            {errors.genre && <p className={style["error-message"]}>{errors.genre}</p>}
            <ul className={style["genre-list"]}>
              {selectedGenres.map(selectedGenre => (
                <li key={selectedGenre}>
                  {selectedGenre}{' '}
                  <button type="button" onClick={() => toggleGenre(selectedGenre)}>
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
              // required
            ></textarea>
            {errors.description && <p className={style["error-message"]}>{errors.description}</p>}
          </div>
          <div className={style["form-group"]}>
            <label htmlFor="country" className={style["form-label"]}>País:</label>
            <input
              type="text"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className={style["form-input"]}
              // required
            />
            {errors.country && <p className={style["error-message"]}>{errors.country}</p>}
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
                // required
              />
              </div>
              {poster && (
                <div className={style["image-preview-container"]}>
                  <img src={typeof window !== "undefined" && window.URL.createObjectURL(poster)} alt="Preview" className={style["poster-preview"]} />
                </div>
              )}
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
                // required
              />
              {trailer && (
                <div className={style["image-preview-container"]}>
                  <video src={typeof window !== "undefined" && window.URL.createObjectURL(trailer)} controls alt="Preview" className={style["poster-preview"]} />
                </div>
              )}
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
                // required
              />
              {movie && (
                <div className={style["image-preview-container"]}>
                  <video src={typeof window !== "undefined" && window.URL.createObjectURL(movie)} controls alt="Preview" className={style["poster-preview"]} />
                </div>
              )}
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
    </div>
  );
};
export default withPageAuthRequired(MovieForm);