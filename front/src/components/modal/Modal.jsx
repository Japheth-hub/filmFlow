import style from './Modal.module.scss'


const Modal = ({ isOpen, onClose, movieData, modalSend }) => {

    if (!isOpen || !movieData) return null;
    const modalClassName = isOpen ? style.modalUp : style.modal; 
    
    
  
    return (
      <div className={modalClassName}>
      <div className={style.modalContent}>
        <div className={style.modalBody}>
          <div className={style['poster-description-container']}>
          <div className={style['container-info']}>
            <div className={style['image-preview-container']}>
            <img src={movieData.poster} alt={movieData.name + ' poster'} className={style['poster-image']} />
            </div> 
            <div className={style['description-container-info']}>
              <span className={style['italic-dark']}>{movieData.name}</span>
              <p><span className={style['italic-dark']}>Dirigida por: {movieData.director}</span></p>
              <p><span className={style['italic-dark']}>País:<ul className={style['italic-dark']}>
                {movieData.countries.map((country, index) => (
                  <li className={style['italic-dark']} key={index}>{country.replace(/\b\w/g, c => c.toUpperCase())}</li>
                  ))}
                  </ul></span></p>
              <p><span className={style['italic-dark']}>Descripción: {movieData.description}</span></p>
                <ul className={style['italic-dark']}>
                {movieData.genres.map((genre, index) => (
                  <li className={style['italic-dark']} key={index}>{genre}</li>
                  ))}
                  </ul>
              
            </div>
          </div>
        </div>
        <div className={style['media-container']}>
                  <video src={movieData.trailer} className={style["video-image"]}/>
        </div>
        </div>
      <span className={style.close} onClick={onClose}>&times;</span>
      </div>
    </div>
    );
  };
  
  export default Modal;