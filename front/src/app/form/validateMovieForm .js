export function validateMovieForm(data) {
  const errors = {};
  const validFields = {};

  // name
  if (!data.movieName || data.movieName.trim() === '') {
    errors.movieName = 'El nombre de la película es obligatorio.';
  } else if (!data.movieName.charAt(0).toUpperCase() === data.movieName.charAt(0)) {
    errors.movieName = 'El nombre de la película debe comenzar con mayúscula.';
  } else {
    validFields.movieName = data.movieName;
  }

  // Director
  if (!data.director || data.director.trim() === '') {
    errors.director = 'El nombre del director es obligatorio.';
  } else if (!data.director.charAt(0).toUpperCase() === data.director.charAt(0)) {
    errors.director = 'El nombre del director debe comenzar con mayúscula.';
  } else {
    validFields.director = data.director;
  }

  // Validate genre
  if (data.selectedGenres.length === 0) {
    errors.genre = 'Debes seleccionar al menos un género.';
  } else {
    validFields.selectedGenres = data.selectedGenres;
  }

  // Description
  if (!data.description || data.description.trim() === '') {
    errors.description = 'La descripción es obligatoria.';
  } else {
    const letterCount = data.description.replace(/[^a-zA-Z]/g, '').length;
    if (letterCount < 10) {
      errors.description = 'La descripción debe tener al menos 10 letras.';
    } else if (letterCount > 300) {
      errors.description = 'La descripción no debe superar las 300 letras.';
    } else {
      validFields.description = data.description;
    }
  }
// Country
  if (!data.country || data.country.trim() === '') {
    errors.country = 'El país es obligatorio.';
  } else if (!data.country.charAt(0).toUpperCase() === data.country.charAt(0)) {
    errors.country = 'El nombre del país debe comenzar con mayúscula.';
  } else {
    validFields.country = data.country;
  }

  // Poster
  if (!data.poster) {
    errors.posterFile = 'Selecciona un póster para la película.';
  } else if (!data.poster.type.startsWith('image/')) {
    errors.posterFile = 'El archivo seleccionado no es una imagen.';
  } else {
    validFields.poster = data.poster;
  }

  // Trailer
  if (!data.trailer) {
    errors.trailerFile = 'Selecciona un trailer para la película.';
  } else if (!data.trailer.type.startsWith('video/')) {
    errors.trailerFile = 'El archivo seleccionado no es un video.';
  } else {
    validFields.trailer = data.trailer;
  }

  // Movie
  if (!data.movie) {
    errors.movieFile = 'Selecciona la película.';
  } else if (!data.movie.type.startsWith('video/')) {
    errors.movieFile = 'El archivo seleccionado no es un video.';
  } else {
    validFields.movie = data.movie;
  }

  return { errors, validFields };
}
