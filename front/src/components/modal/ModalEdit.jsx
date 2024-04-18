import style from './Modal.module.scss';
import axios from 'axios';
import { useState, useEffect, use } from 'react';
import Swal from 'sweetalert2';
import { validateModalEdit, validateSelectForm } from './validateModalEdit ';
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
    const [errors, setErrors] = useState({});
    const [isNameSaveDisabled, setIsNameSaveDisabled] = useState(false);
    const [isDirectorSaveDisabled, setIsDirectorSaveDisabled] = useState(false);









 
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

      // useEffect(() => {
      //   const validation = validateModalEdit({
      //     editedName,
      //     editedDirector,
      //     editedPoster,
      //     editedTrailer,
      //     editedMovie,

      //   })
      //   setErrors(validation.errors)
      // }, [editedName, editedDirector, editedPoster, editedTrailer, editedMovie, selectedGenres, selectedCountries])

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
        const nameErrors = validateModalEdit({editedName : e.target.value})
        setErrors(prevErrors => ({
          ...prevErrors,
          editedName: nameErrors.errors.editedName || ''
        }));
        console.log(nameErrors.errors.editedName);
        nameErrors.errors.editedName ? setIsNameSaveDisabled(true) : setIsNameSaveDisabled(false)

    } else if (field === 'director') {
        setEditedDirector(e.target.value);
        const directorErrors = validateModalEdit({editedDirector: e.target.value})
        setErrors(prevErrors => ({
          ...prevErrors,
          editedDirector: directorErrors.errors.editedDirector || ''
        }));
        directorErrors.errors.editedDirector ? setIsDirectorSaveDisabled(true) : setIsDirectorSaveDisabled(false)
    } 

    };

    console.log('soy errors',errors?.editedName);

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
      console.log(field);

  
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
    switch(field){
      case 'poster':
        const posterValidation = validateModalEdit({ poster: posterData });
        console.log('a', posterValidation.errors.poster);

        if(posterValidation.errors.poster){
        setIsLoading(false)

        Swal.fire({
          icon: 'warning',
          title: '¡Advertencia!',
          text: posterValidation.errors.poster,
        });
        return
      }
        break
      case 'trailer':
        console.log(trailerData);
        const trailerValidation = validateModalEdit({ trailer: trailerData });
        console.log('a', trailerValidation.errors.trailer);
  
        if(trailerValidation.errors.trailer){
        setIsLoading(false)
  
        Swal.fire({
          icon: 'warning',
          title: '¡Advertencia!',
          text: trailerValidation.errors.trailer,
        });
        return
      }
        break
      case 'movie':
        const movieValidation = validateModalEdit({ movie: movieURL });  
        if(movieValidation.errors.movie){
        setIsLoading(false)
  
        Swal.fire({
          icon: 'warning',
          title: '¡Advertencia!',
          text: movieValidation.errors.movie,
        });
        return
      }
        break
      case 'genre':
        const genreValidation = validateSelectForm({genre : selectedGenres})
        if(genreValidation.errors.genre){
          setIsLoading(false)
          Swal.fire({
            icon: 'warning',
            title: '¡Advertencia!',
            text: genreValidation.errors.genre,
          });
          return
        } 
          break
      case 'countries':
        const countriesValidation = validateSelectForm({countries: selectedCountries})
        if(countriesValidation.errors.countries){
          setIsLoading(false)
          Swal.fire({
            icon: 'warning',
            title: '¡Advertencia!',
            text: countriesValidation.errors.countries,                  
          })
          return
        } 
          break

      }
      

    
      const res = await Swal.fire({
        icon: "warning",
        title: "¿Estás seguro?",
        text: "Estas seguro que deseas hacer este cambio? Una vez realizado la pelicula se desactivara hasta que un Administrador revise los cambios",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "Cancelar",
    });
    
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
                      
                        <><label htmlFor="posterFile" className={style["italic-dark"]}>Seleccionar Póster:</label>
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
                            <button onClick={() => handleSave('poster')} disabled={isLoading}>{isLoading ? 'Enviando...' : 'Guardar'}</button>
                            <button onClick={() => toggleEditMode('poster')}>Cancelar</button>
                        </>
                    ) : (
                        <>  
                            <img src={editedPoster ? window.URL.createObjectURL(editedPoster) : movieData.poster} alt={editedPoster + ' poster'} className={style['poster-image']} />
                            <button className={style.imageBtn} onClick={() => toggleEditMode('poster')}>Editar</button>
                        </>
                    )
                ) : (
                    <img src={movieData.poster} alt={movieData.poster + ' poster'} className={style['poster-image']} />
                )}
                </div> 
                </div>
                <div className={style['description-container-info']}>
                  <span className={style['italic-dark']}>
                  {movieData.edit ? (
                        editMode.name 
                            ? <div className={style.displayInput}>
                                <input type="text" value={editedName} onChange={(e) => handleChange(e, 'name')} autoFocus />
                                <div className={style.btn}>
                                <button onClick={() => handleSave('name')} disabled={isNameSaveDisabled || isLoading}>{isLoading ? 'Enviando...' : 'Guardar'}</button>
                                <button onClick={() => toggleEditMode('name')}>Cancelar</button>

                                </div>
                                {errors?.editedName ? <p className={style["error-message"]}>{errors.editedName}</p> : null}
                              </div>
                            : <div className={style.displayInput}>
                                <span>{editedName}</span>
                                <button onClick={() => toggleEditMode('name')}>Editar</button>
                                
                              </div>
                    ) : (
                        <span>{movieData.name}</span>
                    )}
                  </span>
                  
                  <span className={style['italic-dark']}>{'Dirigida por: '}  
                  {movieData.edit ? (
                        editMode.director 
                            ? <div className={style.displayInput}>
                                <input type="text" value={editedDirector} onChange={(e) => handleChange(e, 'director')} autoFocus />
                                <div className={style.btn}>
                                <button onClick={() => handleSave('director')} disabled={isDirectorSaveDisabled || isLoading}>{isLoading ? 'Enviando...' : 'Guardar'}</button>
                                <button onClick={() => toggleEditMode('director')}>Cancelar</button>
                                </div>
                                {errors?.editedDirector && <p className={style["error-message"]}>{errors.editedDirector}</p>}

                              </div>
                            : <div className={style.displayInput}>
                                <span>{editedDirector}</span>
                                <button onClick={() => toggleEditMode('director')}>Editar</button>
                              </div>
                    ) : (
                        <span>{movieData.director}</span>
                    )}
                  </span>
                  <div className={style['italic-dark']}>
                    <p>País:</p>
                    
                    {movieData.edit ? (
                        editMode.countries
                            ? <div className={style.displayInput}>
                                <select  id="countries" value={selectedCountries} onChange={(e) => toggleCountry(e.target.value)} autoFocus>
                                <option value="">Selecciona pais</option>
                                {countryOptions.map(country => (
                                  <option key={country.name} value={country.name}>{country.name.replace(/\b\w/g, c => c.toUpperCase())}</option>
                                ))}
                                </select>
                                <ul className={style["genre-list"]}>
                                {selectedCountries.map(selectedCountry => (
                                  
                                  <li key={selectedCountry}>
                                    <div className={style.tags}>
                                    <span>{selectedCountry.replace(/\b\w/g, c => c.toUpperCase())}{' '}</span>
                                    <button type="button" onClick={() => toggleCountry(selectedCountry)}>
                                      x
                                    </button>
                                    </div>
                                  </li>
                                ))}
                                </ul>
                                <div className={style.btn} >
                                <button onClick={() => handleSave('countries')}>Guardar</button>
                                <button onClick={() => toggleEditMode('countries')}>Cancelar</button>
                                </div>
                              </div>
                            : <div className={style.displayInput}>
                                 <span>{selectedCountries.map((country, index) => (
                                    <li className={style['italic-dark']} key={index}>{country.replace(/\b\w/g, c => c.toUpperCase())} </li>
                                ))}</span>
                                <button onClick={() => toggleEditMode('countries')}>Editar</button>
                              </div>
                    ) : (
                      <span>{movieData.countries.map((country, index) => (
                        <li className={style['italic-dark']} key={index}>{country}</li>
                    ))}</span>
                    )}
                    
                    
                  </div>
                 
                  <div className={style['italic-dark']}>
                      <p>Géneros:</p>
                  {movieData.edit ? (
                        editMode.genre
                            ? <div className={style.displayInput}>
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
                                <div className={style.btn}>
                                <button onClick={() => handleSave('genre')}>Guardar</button>
                                <button onClick={() => toggleEditMode('genre')}>Cancelar</button>
                                </div>

                              </div>
                            : <div className={style.displayInput}>
                                 <span>{selectedGenres.map((genre, index) => (
                                    <li className={style['italic-dark']} key={index}>{genre.replace(/\b\w/g, c => c.toUpperCase())}</li>
                                ))}</span>
                                <button onClick={() => toggleEditMode('genre')}>Editar</button>
                              </div>
                    ) : (
                      <span>{movieData.genres.map((genre, index) => (
                        <li className={style['italic-dark']} key={index}>{genre}</li>
                    ))}</span>
                    )}
                    
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
                              </div>
                            
                            <button onClick={() => handleSave('movie')}disabled={isLoading}>{isLoading ? 'Enviando...' : 'Enviar'}</button>
                            <button onClick={() => toggleEditMode('movie')}>Cancelar</button>
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