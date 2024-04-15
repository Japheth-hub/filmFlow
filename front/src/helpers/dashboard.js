import axios from 'axios'
const URL = process.env.NEXT_PUBLIC_URL;


export const showMovies = async () => {
  try {
    const { data } = await axios(`${URL}movies?paranoid=false&admin=true`);
    const clearData = data.map((movie) => {
      return {
        id: movie.id,
        name: movie.name,
        duration: movie.duration,
        status: movie.status,
        user: movie.user ? movie.user.name : "Admin",
        price: movie.price,
        genre: movie.genres.map((genero) => genero.name).join("/"),
        deleted: movie.deletedAt ? movie.deletedAt.slice(0, 10) : "Active",
      };
    });
    return clearData;
  } catch (error) {
    console.log('Error en Movies', error);
  }
};

export const showUsers = async (sid) => {
  try {
    const { data } = await axios.get(`${URL}users/${sid}`);
    const clearData = data.map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.roleName,
        sid: user.sid,
        created: user.createdAt.slice(0, 10),
        deleted: user.deletedAt ? user.deletedAt.slice(0, 10) : "Active"
      };
    });
    return clearData;
  } catch (error) {
    console.log("Error en la funcion showUsers de admin/page.jsx", error);
  }
};

export const showReviews = async () => {
  try {
    const { data } = await axios(`${URL}reviews`);
    const clearData = data.map((review) => {
      return {
        ...review,
        update: review.update.slice(0, 10),
        deleted: review.deleted ? review.deleted.slice(0, 10) : "Active",
      };
    });
    return clearData;
  } catch (error) {
    console.log('Error en reviews', error);
  }
};

export const showDiscount = async () => {
  try {
    const { data } = await axios(`${URL}discount`);
    const clearData = data.map((discount)=>{
      return {
        id: discount.id,
        code: discount.code,
        percentage: discount.percentage,
        used: discount.used,
        starts: discount.starts.slice(0, 10),
        ends: discount.ends.slice(0, 10),
        movie: discount.movies?.map((movie) => movie.name).join('/')
      };
    })
    return clearData
  } catch (error) {
    console.log('Error en el discount', error)
  }
}

export const showOrder = async (order, tipo, body) => {
  let newBody
  if (tipo === "Name") {
    if (!order) {
      newBody = body.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      newBody = body.sort((a, b) => b.name.localeCompare(a.name));
    }
  } else if (tipo === "Duration") {
    if (!order) {
      newBody = body.sort((a, b) => b.duration - a.duration);
    } else {
      newBody = body.sort((a, b) => a.duration - b.duration);
    }
  } else if (tipo === "Movie") {
    if (!order) {
      newBody = body.sort((a, b) => {
        if (!a.movie) return 1;
        if (!b.movie) return -1;
        return a.movie.localeCompare(b.movie);
      });
    } else {
      newBody = body.sort((a, b) => {
        if (!a.movie) return 1;
        if (!b.movie) return -1;
        return b.movie.localeCompare(a.movie);
      });
    }
  } else if (tipo === "Points") {
    if (!order) {
      newBody = body.sort((a, b) => b.points - a.points);
    } else {
      newBody = body.sort((a, b) => a.points - b.points);
    }
  } else if (tipo === "Role") {
    if (!order) {
      newBody = body.sort((a, b) => a.role.localeCompare(b.role));
    } else {
      newBody = body.sort((a, b) => b.role.localeCompare(a.role));
    }
  } else if (tipo === "Percentage") {
    if (!order) {
      newBody = body.sort((a, b) => a.percentage - b.percentage);
    } else {
      newBody = body.sort((a, b) => b.percentage - a.percentage);
    }
  }
  return newBody
}