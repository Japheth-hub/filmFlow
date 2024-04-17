export function validateModalEdit(data) {
  const errors = {};
  const validFields = {};

  // name
  if (!data.movieName || data.movieName.trim() === '') {
    errors.movieName = ' ';
  } else if (data.movieName.trim().length < 2) {
    errors.movieName = 'El nombre de la película debe tener al menos 2 caracteres.';
  } else if (!/^[A-Z0-9&#!¡¿?:,][A-Za-z0-9&#!¡¿?:,\s]*$/.test(data.movieName)) {
    errors.movieName = 'El nombre de la película debe comenzar con mayúscula y solo puede contener letras, números y los siguientes símbolos: (&, ;, :, #, !, ¡, ¿, ?)';
  } else {
    validFields.movieName = data.movieName;
  }
  // Director
  if (!data.director || data.director.trim() === '') {
    errors.director = ' ';
  } else if (!/^[A-Z][a-z]*( [A-Z][a-z]*)*$/.test(data.director)) {
    errors.director = 'El nombre del director debe comenzar con mayúscula cada inicio de palabra y no puede contener números.';
  } else {
    validFields.director = data.director;
  }
 // Description
 if (!data.description || data.description.trim() === '') {
  errors.description = ' ';
} else {
  const descriptionSymbolsRegex = /^[a-zA-Z0-9\s;,:.¡!¿?()áéíóúÁÉÍÓÚÜüñÑ]*$/; // Se agregaron los caracteres con acentos y la letra ñ
  if (!descriptionSymbolsRegex.test(data.description)) {
    errors.description = 'La descripción solo puede contener letras, números y los siguientes símbolos: ";", ",", ":", ".", "¡", "!", "¿", "?", "(", ")".'
  } else {
    const letterCount = data.description.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]/g, '').length; // Se incluyeron las letras con acentos y la letra ñ
    if (letterCount < 10) {
      errors.description = 'La descripción debe tener al menos 10 letras.';
    } else if (letterCount > 300) {
      errors.description = 'La descripción no debe superar las 300 letras.';
    } else {
      validFields.description = data.description;
    }
  }
}
  // Poster
  if (!data.poster) {
    errors.posterFile = ' ';
  } else if (!data.poster.type.startsWith('image/')) {
    errors.posterFile = 'El archivo seleccionado no es una imagen.';
  } else {
    validFields.poster = data.poster;
  }

  // Trailer
  if (!data.trailer) {
    errors.trailerFile = ' ';
  } else if (!data.trailer.type.startsWith('video/')) {
    errors.trailerFile = 'El archivo seleccionado no es un video.';
  } else {
    validFields.trailer = data.trailer;
  }
  // Movie
  if (!data.movie) {
    errors.movieFile = ' .';
  } else if (!data.movie.type.startsWith('video/')) {
    errors.movieFile = 'El archivo seleccionado no es un video.';
  } else {
    validFields.movie = data.movie;
  }
  // Year
  if (!data.year || data.year.trim() === '') {
   errors.year = ' ';
 } else if (!/^(19|20)\d{2}$/.test(data.year)) {
   errors.year = 'El año debe comenzar con "19" o "20" y tener cuatro dígitos.';
 } else {
   validFields.year = data.year;
 }

  return { errors, validFields };
}

// Country
export function validateSelectForm(data) { 
  const errors = {};
  const validFields = {};
if (data.selectedCountries.length === 0) {
  errors.countries = 'Debes seleccionar al menos un pais.';
} else {
  validFields.selectedCountries = data.selectedCountries;
}

  // Genre
  if (data.selectedGenres.length === 0) {
    errors.genre = 'Debes seleccionar al menos un genero.';
  } else {
    validFields.selectedGenres = data.selectedGenres;
  }
return { errors, validFields };
}

