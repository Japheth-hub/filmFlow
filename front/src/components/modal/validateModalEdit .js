export function validateModalEdit(data) {
  console.log('tpy',data.genre);
  const errors = {};
  const validFields = {};

  // name
   if (!data.editedName || data.editedName.trim().length < 2) {
    errors.editedName = 'El nombre de la película debe tener al menos 2 caracteres.';
  } else if (!/^[A-Z0-9&#!¡¿?:,][A-Za-z0-9&#!¡¿?:,\s]*$/.test(data.editedName)) {
    errors.editedName = 'El nombre de la película debe comenzar con mayúscula y solo puede contener letras, números y los siguientes símbolos: (&, ;, :, #, !, ¡, ¿, ?)';
  } else {
    validFields.editedName = data.editedName;
  }
  // Director
  if (!data.editedDirector || data.editedDirector.trim().length < 2) {
    errors.editedDirector = 'El nombre del director debe tener al menos 2 caracteres.';
  } else if (!/^[A-Z][a-z]*( [A-Z][a-z]*)*$/.test(data.editedDirector)) {
    errors.editedDirector = 'El nombre del Director debe comenzar con mayúscula cada inicio de palabra y no puede contener números.';
  } else {
    validFields.editedDirector = data.editedDirector;
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
    errors.poster = 'Es obligatorio subir una imagen';
  } else if (!data.poster.startsWith('data:image/')) {
    errors.poster = 'El archivo seleccionado no es una imagen.';
  } else {
    validFields.poster = data.poster;
  }

  // Trailer
  if (!data.trailer) {
    errors.trailer = 'Es obligatorio subir un trailer';
  } else if (!data.trailer.startsWith('data:video/')) {
    errors.trailer = 'El archivo seleccionado no es un video.';
  } else {
    validFields.trailer = data.trailer;
  }
  // Movie
  if (!data.movie) {
    errors.movie = 'Es obligatorio subir una pelicula';
  } else if (!data.movie.startsWith('data:video/')) {
    errors.movie = 'El archivo seleccionado no es un video.';
  } else {
    validFields.movie = data.editedMovie;
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
  console.log('toy',data.genre);
  const errors = {};
  const validFields = {};
  if(data.countries){
    if (data.countries.length === 0) {
      errors.countries = 'Debes seleccionar al menos un pais.';
    } else {
      validFields.countries = data.countries;
    }

  }

  // Genre
  if(data.genre){
    if (data.genre.length === 0) {
      errors.genre = 'Debes seleccionar al menos un genero.';
    } else {
      validFields.genre = data.genre;
    }
  }
return { errors, validFields };
}

