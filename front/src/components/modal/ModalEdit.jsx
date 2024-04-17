import style from './Modal.module.scss';
import axios from 'axios';
import { useState, useEffect, use } from 'react';
import Swal from 'sweetalert2';
const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL


const Modal = ({ isOpen, onClose, movieData }) => {

    if (!isOpen || !movieData) return null;

    const modalClassName = isOpen ? style.modalUp : style.modal; 

    const [editMode, setEditMode] = useState({});
    const [genreOptions, setGenreOptions] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState(movieData.genres);
    const [countryOptions, setCountryOptions] = useState([]); 
    const [selectedCountries, setSelectedCountries] = useState(movieData.countries);
    const [editedName, setEditedName] = useState(movieData.name)
    const [editedDirector, setEditedDirector] = useState(movieData.director)
    const [editedPoster, setEditedPoster] = useState(null)
    const [editedTrailer, setEditedTrailer] = useState(null)
    const [editedMovie, setEditedMovie] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [mediaType, setMediaType] = useState('trailer');








 
    useEffect(() => {
      axios.get(`${NEXT_PUBLIC_URL}genres`)
          .then(response => {
            const genreNames = response.data.map(genre => genre.name);
            setGenreOptions(genreNames);
          })
          .catch(error => {
            console.error('Error fetching genre options:', error);
          });
          axios.get(`${NEXT_PUBLIC_URL}countries`) 
          .then(response => {
            setCountryOptions(response.data); 
          })
          .catch(error => {
            console.error('Error fetching country options:', error);
          });
      }, []);
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
      
      const handlePosterChange = (e) => {
         setEditedPoster(e.target.files[0]);
         
      };
      const handleTrailerChange =  (e) => {
        
         setEditedTrailer(e.target.files[0]);
       
      };
      const handleMovieChange =  (e) => {
         setEditedMovie(e.target.files[0]);
      };
      
      
       
      
    


    
    const toggleEditMode = (field) => {
      
        setEditMode(prevState => ({ ...prevState, [field]: !prevState[field] }));
        
    };
    
   



    
    const handleChange = (e, field) => {
      
      if (field === 'name') {
        setEditedName(e.target.value);
    } else if (field === 'director') {
        setEditedDirector(e.target.value);
    } 

    };


    const toggleMediaType = () => {
      setMediaType(prevMediaType => prevMediaType === 'trailer' ? 'movie' : 'trailer');
    };



    const readFileAsync = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
      });
    };
    
    
    const handleSave = async (field) => {
     setIsLoading(true)
 
      const res = await Swal.fire({
        icon: "warning",
        title: "¿Estás seguro?",
        text: "Estas seguro que deseas hacer este cambio? Una vez realizado la pelicula se desactivara hasta que un Administrador revise los cambios",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "Cancelar",
    });
   
    try {
      
      let posterData, trailerData, movieURL;

    if (editedPoster !== null) {
      posterData = await readFileAsync(editedPoster);
    }
    if (editedTrailer !== null) {
      trailerData = await readFileAsync(editedTrailer);
    }
    if (editedMovie !== null) {
      movieURL = await readFileAsync(editedMovie);
    }

    
     
      if(res.isConfirmed ){
          switch(field){
            case 'name': 
              await axios.put(`${NEXT_PUBLIC_URL}movies/${movieData.id}`, {name: editedName})
              
            break
            case 'director':
              await axios.put(`${NEXT_PUBLIC_URL}movies/${movieData.id}`, {director: editedDirector})
              
            break
            case 'poster' :
              await axios.put(`${NEXT_PUBLIC_URL}movies/${movieData.id}`, {posterFile: posterData})
              
            break 
            case 'genre' :
              console.log(selectedGenres);
              await axios.put(`${NEXT_PUBLIC_URL}movies/${movieData.id}`, {genres: selectedGenres})
              break
            case 'countries':
              await axios.put(`${NEXT_PUBLIC_URL}movies/${movieData.id}`, {countries: selectedCountries})
              break
            case 'trailer':
              await axios.put(`${NEXT_PUBLIC_URL}movies/${movieData.id}`, {trailerFile: trailerData})
              break
            case 'movie':
              await axios.put(`${NEXT_PUBLIC_URL}movies/${movieData.id}`, {movieFile: movieURL})
              break


            
 

              




          }}
          setIsLoading(false)
 
          toggleEditMode(field);
    } catch (error) {
      console.error('Axios request error:', error);
        
    }

    };

    return (
      <div className={modalClassName}>
        <div className={style.modalContent}>
          <div className={style.modalBody}>
            <div className={style['poster-description-container']}>
              <div className={style['container-info']}>
                <div className={style['image-preview-container']}>
                  
                {movieData.edit ? (
                    editMode.poster ? (
                      
                        <><label htmlFor="posterFile" className={style["form-label"]}>Seleccionar Póster:</label>
                            <input
                                type="file"
                                id="posterFile"
                                onChange={handlePosterChange}
                                accept="image/*"
                            />
                            {editedPoster && (
                              <div className={style["image-preview-container"]}>
                              <img src={window.URL.createObjectURL(editedPoster)} alt={editedPoster.name + ' poster'} className={style['poster-image']} />
                              </div>
                            )}
                            <button onClick={() => handleSave('poster')} disabled={isLoading}>{isLoading ? 'Enviando...' : 'Enviar'}</button>
                            <button onClick={() => toggleEditMode('poster')}>Cancelar</button>
                        </>
                    ) : (
                        <>  
                            <img src={editedPoster ? window.URL.createObjectURL(editedPoster) : movieData.poster} alt={editedPoster + ' poster'} className={style['poster-image']} />
                            <button onClick={() => toggleEditMode('poster')}>Editar</button>
                        </>
                    )
                ) : (
                    <img src={movieData.poster} alt={movieData.poster + ' poster'} className={style['poster-image']} />
                )}
                </div> 
                <div className={style['description-container-info']}>
                  <span className={style['italic-dark']}>
                  {movieData.edit ? (
                        editMode.name 
                            ? <>
                                <input type="text" value={editedName} onChange={(e) => handleChange(e, 'name')} autoFocus />
                                <button onClick={() => handleSave('name')}>Guardar</button>
                                <button onClick={() => toggleEditMode('name')}>Cancelar</button>

                              </>
                            : <>
                                <span>{editedName}</span>
                                <button onClick={() => toggleEditMode('name')}>Editar</button>
                              </>
                    ) : (
                        <span>{movieData.name}</span>
                    )}
                  </span>
                  <p><span className={style['italic-dark']}>{'Dirigida por: '}  
                  {movieData.edit ? (
                        editMode.director 
                            ? <>
                                <input type="text" value={editedDirector} onChange={(e) => handleChange(e, 'director')} autoFocus />
                                <button onClick={() => handleSave('director')}>Guardar</button>
                                <button onClick={() => toggleEditMode('director')}>Cancelar</button>

                              </>
                            : <>
                                <span>{editedDirector}</span>
                                <button onClick={() => toggleEditMode('director')}>Editar</button>
                              </>
                    ) : (
                        <span>{movieData.director}</span>
                    )}
                  </span></p>
                  <div className={style['italic-dark']}>
                    <p>País:</p>
                    <ul className={style['italic-dark']}>
                    {movieData.edit ? (
                        editMode.countries
                            ? <>
                                <select id="countries" value={selectedCountries} onChange={(e) => toggleCountry(e.target.value)} autoFocus>
                                <option value="">Selecciona pais</option>
                                {countryOptions.map(country => (
                                  <option key={country.name} value={country.name}>{country.name.replace(/\b\w/g, c => c.toUpperCase())}</option>
                                ))}
                                </select>
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
                                <button onClick={() => handleSave('countries')}>Guardar</button>
                                <button onClick={() => toggleEditMode('countries')}>Cancelar</button>

                              </>
                            : <>
                                 <span>{movieData.countries.map((country, index) => (
                                    <li className={style['italic-dark']} key={index}>{country}</li>
                                ))}</span>
                                <button onClick={() => toggleEditMode('countries')}>Editar</button>
                              </>
                    ) : (
                      <span>{movieData.countries.map((country, index) => (
                        <li className={style['italic-dark']} key={index}>{country}</li>
                    ))}</span>
                    )}
                    
                    </ul>
                  </div>
                  {movieData.edit ? null :
                  <p><span className={style['italic-dark']}>Descripción: 
                  </span></p>

                  }
                  {movieData.edit ? null
                        // editMode.description 
                        //     ? <>
                        //         <input type="text-area" value={movieData.description} onChange={(e) => handleChange(e, 'description')} autoFocus />
                        //         <button onClick={() => handleSave('description')}>Guardar</button>
                        //         <button onClick={() => toggleEditMode('description')}>Cancelar</button>

                        //       </>
                        //     : <>
                        //         <span>{movieData.description}</span>
                        //         <button onClick={() => toggleEditMode('description')}>Editar</button>
                        //       </>
                     : 
                        <span>{movieData.description}</span>
                    }
                  <div className={style['italic-dark']}>
                      <p>Géneros:</p>
                  {movieData.edit ? (
                        editMode.genre
                            ? <>
                                <select id="genres" value={selectedGenres} onChange={(e) => toggleGenre(e.target.value)} autoFocus>
                                <option value="">Selecciona géneros</option>
                                  {genreOptions.map(genre => (
                                  <option key={genre} value={genre}>{genre.replace(/\b\w/g, c => c.toUpperCase())}</option>))}
                                </select>
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
                                <button onClick={() => handleSave('genre')}>Guardar</button>
                                <button onClick={() => toggleEditMode('genre')}>Cancelar</button>

                              </>
                            : <>
                                 <span>{selectedGenres.map((genre, index) => (
                                    <li className={style['italic-dark']} key={index}>{genre.replace(/\b\w/g, c => c.toUpperCase())}</li>
                                ))}</span>
                                <button onClick={() => toggleEditMode('genre')}>Editar</button>
                              </>
                    ) : (
                      <span>{movieData.genres.map((genre, index) => (
                        <li className={style['italic-dark']} key={index}>{genre}</li>
                    ))}</span>
                    )}
                    
                  </div>
                </div>
              </div>
            </div>
            
            <div className={style['media-container']}>
            <button onClick={toggleMediaType}>
            {mediaType === 'trailer' ? 'Ver Película' : 'Ver Trailer'}
            </button>
            {mediaType === 'trailer'  ? (
                    editMode.trailer ? (
                      
                        <><label htmlFor="trailerFile" className={style["italic-dark"]}>Seleccionar Trailer:</label>
                        <input 
                          type="file"
                          id="trailerFile"
                          onChange={handleTrailerChange}
                          className={style["form-input"]}
                          accept="video/*"
                        />
                            
                              <div className={style["image-preview-container"]}>
                              <video src={editedTrailer ? window.URL.createObjectURL(editedTrailer) : movieData.trailer} controls alt={editedTrailer + ' trailer'} className={style["edit-video-image"]} />
                              </div>
                            
                            <button onClick={() => handleSave('trailer')}disabled={isLoading}>{isLoading ? 'Enviando...' : 'Enviar'}</button>
                            <button onClick={() => toggleEditMode('trailer')}>Cancelar</button>
                        </>
                    ) : (
                      <>  <p><label className={style['italic-dark']} >Trailer:</label></p>
  
                            
                            <video src={editedTrailer ? window.URL.createObjectURL(editedTrailer) : movieData.trailer} controls alt={editedTrailer + ' trailer'} className={style["edit-video-image"]} />
                            <button onClick={() => toggleEditMode('trailer')}>Editar</button>
                        </>
                    )
                ) : 
                  (
                    editMode.movie ? (
                      
                        <><label htmlFor="movieFile" className={style["italic-dark"]}>Seleccionar Pelicula:</label>
                        <input 
                          type="file"
                          id="movieFile"
                          onChange={handleMovieChange}
                          className={style["form-input"]}
                          accept="video/*"
                        />
                            
                              <div className={style["image-preview-container"]}>
                              <video src={editedMovie ? window.URL.createObjectURL(editedMovie) : movieData.movie} controls alt={editedMovie + ' movie'} className={style["edit-video-image"]} />
                            
                            <button onClick={() => handleSave('movie')}disabled={isLoading}>{isLoading ? 'Enviando...' : 'Enviar'}</button>
                            <button onClick={() => toggleEditMode('movie')}>Cancelar</button>
                              </div>
                        </>
                    ) : (
                        <>  <p><label className={style['italic-dark']} >Pelicula:</label></p>
                            <video src={editedMovie ? window.URL.createObjectURL(editedMovie) : movieData.movie} controls alt={editedTrailer + ' movie'} className={style["edit-video-image"]} />
                            <button onClick={() => toggleEditMode('movie')}>Editar</button>
                        </>
                    )
                ) }
                </div> 
               
            
            
          </div>
          <span className={style.close} onClick={onClose}>&times;</span>
        </div>  
      </div>
    );
};

export default Modal;