'use client'
import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import style from './form.module.css'

const MovieForm = () => {
  const [movieName, setMovieName] = useState('');
  const [director, setDirector] = useState('');
  const [genre, setGenre] = useState([]);
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [poster, setPoster] = useState(null);
  const [movie, setMovie] = useState(null);
  const [triler, setTriler] = useState(null);
  const [country, setCountry] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const data = {
        name: movieName,
        director: director,
        genres: genre.join(','),
        description: description,
        duration: duration,
        country: country,
        posterFile: poster,
        movieFile: movie,
        trilerFile: triler,
      };
  
      // Convertir la imagen a base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function() {
        data.file = reader.result;
  
        // Envía los datos al backend
        const movieResponse = axios.post('http://localhost:3001/movies', data);
        
        setSuccessMessage('Formulario enviado correctamente');
        setErrorMessage('');
        console.log('Server response:', movieResponse);
  
        // Resetea los campos del formulario
        setMovieName('');
        setDirector('');
        setGenre([]);
        setDescription('');
        setDuration('');
        setPoster(null);
        setMovie(null);
        setTriler(null);
        setCountry('');
      };
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage('Error al enviar datos: ' + error.message);
      console.error('Error sending data:', error);
    }
  };
  

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const toggleGenre = (selectedGenre) => {
    if (genre.includes(selectedGenre)) {
      setGenre(genre.filter((g) => g !== selectedGenre));
    } else {
      setGenre([...genre, selectedGenre]);
    }
  };

  return (
    <div className={style["movie-form-container"]}>
      <Link href="/">
        <button className={style["back-button"]}>Ir a Inicio</button>
      </Link>
      <div className={style["form-wrapper"]}>
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
              className="form-input"
              required
            />
          </div>
          <div className={style["form-group"]}>
            <label htmlFor="director" className={style["form-label"]}>Director:</label>
            <input
              type="text"
              id="director"
              value={director}
              onChange={(e) => setDirector(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className={style["form-group"]}>
            <label htmlFor="genre" className={style["form-label"]}>Género:</label>
            <select
              id="genre"
              value={genre}
              onChange={(e) => toggleGenre(e.target.value)}
              className="form-input"
            >
          <option value="">Select a genre</option>
          <option value="Action">Acción</option>
          <option value="Adventure">Aventura</option>
          <option value="Animation">Animación</option>
          <option value="Comedy">Comedia</option>
          <option value="Crime">Crimen</option>
          <option value="Documentary">Documental</option>
          <option value="Drama">Drama</option>
          <option value="Family">Familia</option>
          <option value="Fantasy">Fantasía</option>
          <option value="History">Historia</option>
          <option value="Horror">Horror</option>
          <option value="Music">Musica</option>
          <option value="Mystery">Misterio</option>
          <option value="Romance">Romance</option>
          <option value="Science Fiction">Ciencia ficción</option>
          <option value="TV Movie">Película de televisión</option>
          <option value="Thriller">Suspenso</option>
          <option value="War">Guerra</option>
          <option value="War">Western</option>
        </select>
        <ul className={style["genre-list"]}>
              {genre.map((g) => (
                <li key={g}>
                  {g}{' '}
                  <button type="button" onClick={() => toggleGenre(g)}>
                    Eliminar
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
              className="form-textarea"
              required
            ></textarea>
          </div>
          <div className={style["form-group"]}>
            <label htmlFor="duration" className={style["form-label"]}>Duración (en minutos):</label>
            <input
              type="number"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className={style["form-group"]}>
            <label htmlFor="country" className={style["form-label"]}>País:</label>
            <input
              type="text"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className={style["form-group"]}>
            <label htmlFor="posterFile" className={style["form-label"]}>Seleccionar Póster:</label>
            <input
              type="file"
              id="posterFile"
              onChange={handleFileChange}
              className="form-input"
              accept="image/*"
              required
            />
            {poster && (
              <div>
                <img src={URL.createObjectURL(poster)} alt="Preview" className="poster-preview" />
              </div>
            )}
          </div>
          <div className={style["form-group"]}>
            <label htmlFor="posterFile" className={style["form-label"]}>Seleccionar Pelicula:</label>
            <input
              type="file"
              id="movieFile"
              onChange={handleFileChange}
              className="form-input"
              accept="video/*"
              required
            />
          </div>
          <div className={style["form-group"]}>
            <label htmlFor="posterFile" className={style["form-label"]}>Seleccionar Trailer:</label>
            <input
              type="file"
              id="trailerFile"
              onChange={handleFileChange}
              className="form-input"
              accept="video/*"
              required
            />
          </div>
          <button type="submit" className="submit-button">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default MovieForm;