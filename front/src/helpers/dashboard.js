import axios from 'axios'
const URL = process.env.NEXT_PUBLIC_URL;


export const showMovies = async () => {
  try {
    const { data } = await axios(`${URL}movies?paranoid=false&admin=true`);
    const clearData = data.map((movie) => {
      return {
        id: movie.id,
        nombre: movie.name || "",
        duracion: movie.duration,
        status: movie.status,
        usuario: movie.user ? movie.user.name : "Admin",
        precio: movie.price,
        genero: movie.genres.map((genero) => genero.name).join("/"),
        eliminado: movie.deletedAt ? movie.deletedAt.slice(0, 10) : "Active",
      };
    });
    return clearData;
  } catch (error) {
    console.error('Error en Movies', error);
  }
};

export const showUsers = async (sid) => {
  try {
    const { data } = await axios.get(`${URL}users/${sid}`);
    const clearData = data.map((user) => {
      return {
        id: user.id,
        nombre: user.name,
        correo: user.email,
        rol: user.roleName,
        // sid: user.sid,
        creado: user.createdAt.slice(0, 10),
        eliminado: user.deletedAt ? user.deletedAt.slice(0, 10) : "Active"
      };
    });
    return clearData;
  } catch (error) {
    console.error("Error en la funcion showUsers de admin/page.jsx", error);
  }
};

export const showReviews = async () => {
  try {
    const { data } = await axios(`${URL}reviews`);
    const clearData = data.map((review) => {
      return {
        id: review.id,
        pelicula: review.movie || "",
        usuario: review.user || "",
        comentario: review.comment,
        puntos: review.points,
        actualizado: review.update.slice(0, 10),
        eliminado: review.deleted ? review.deleted.slice(0, 10) : "Active",
      };
    });
    return clearData;
  } catch (error) {
    console.error('Error en reviews', error);
  }
};

export const showDiscount = async () => {
  try {
    const { data } = await axios(`${URL}discount`);
    const clearData = data.map((discount)=>{
      return {
        id: discount.id,
        codigo: discount.code,
        porcentaje: discount.percentage,
        // used: discount.used,
        inicio: discount.starts.slice(0, 10),
        fin: discount.ends.slice(0, 10),
        pelicula: discount.movies?.map((movie) => movie.name).join("/") || "",
        genero: discount.genres?.map((genre) => genre.name).join("/") || "",
        creado: discount.createdAt.slice(0, 10)
      };
    })
    return clearData
  } catch (error) {
    console.error('Error en el discount', error)
  }
}

export const showOrder = async (order, tipo, body) => {
  let newBody
  if (tipo === "Name") {
    if (!order) {
      newBody = body.sort((a, b) => a.nombre.localeCompare(b.nombre));
    } else {
      newBody = body.sort((a, b) => b.nombre.localeCompare(a.nombre));
    }
  } else if (tipo === "Duration") {
    if (!order) {
      newBody = body.sort((a, b) => b.duracion - a.duracion);
    } else {
      newBody = body.sort((a, b) => a.duracion - b.duracion);
    }
  } else if (tipo === "Movie") {
    if (!order) {
      newBody = body.sort((a, b) => {
        if (!a.pelicula) return 1;
        if (!b.pelicula) return -1;
        return a.pelicula.localeCompare(b.pelicula);
      });
    } else {
      newBody = body.sort((a, b) => {
        if (!a.pelicula) return 1;
        if (!b.pelicula) return -1;
        return b.pelicula.localeCompare(a.pelicula);
      });
    }
  } else if (tipo === "Points") {
    if (!order) {
      newBody = body.sort((a, b) => b.puntos - a.puntos);
    } else {
      newBody = body.sort((a, b) => a.puntos - b.puntos);
    }
  } else if (tipo === "Role") {
    if (!order) {
      newBody = body.sort((a, b) => a.rol.localeCompare(b.rol));
    } else {
      newBody = body.sort((a, b) => b.rol.localeCompare(a.rol));
    }
  } else if (tipo === "Percentage") {
    if (!order) {
      newBody = body.sort((a, b) => a.porcentaje - b.porcentaje);
    } else {
      newBody = body.sort((a, b) => b.porcentaje - a.porcentaje);
    }
  } else if (tipo === "Amount") {
    if (!order) {
      newBody = body.sort((a, b) => a.monto - b.monto);
    } else {
      newBody = body.sort((a, b) => b.monto - a.monto);
    }
  }
  return newBody
}

export const showSelects = async () => {
  try {
    const select = {}
    const mov = await axios(`${URL}movies`);
    const gen = await axios(`${URL}genres`);
    select.movies = mov.data.map((movie)=>{
      return {
        id: movie.id,
        name: movie.name
      }
    })
    select.genres = gen.data.map((genre)=>{
      return {
        id: genre.id,
        name: genre.name
      }
    })
    return select
  } catch (error) {
    console.error(error)
  }
}

export const showPurchases = async (sid) => {
  try {
    const { data } = await axios(`${URL}purchases/dashboard/${sid}`);
    const clearData = data.map((purchase) => {
      return  {
        id: purchase.id,
        stripeId: purchase.stripeId,
        status: purchase.status,
        metodo: purchase.method,
        moneda: purchase.currency,
        monto: purchase.amount,
        creado: purchase.createdAt.slice(0, 10),
        usuario: purchase.user.name || "",
        correo: purchase.user.email || ""
      }
    })
    return clearData
  } catch (error) {
    console.error(error)
  }
}