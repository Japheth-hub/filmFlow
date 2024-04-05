import axios from 'axios';

const URL = process.env.NEXT_PUBLIC_URL

export const movieGenre = async() => {
    let listGenres
    try {
        const genres = await axios.get(`${URL}genres`);
            listGenres = genres.data.map(genre => {
            return{
            name: genre.name,
            cant: 0
        }})
        const movies = await axios.get(`${URL}movies`);
        listGenres.forEach(genre => {
            movies.data.forEach(movies => {
                let containsGenre = movies.genres.some(elem => genre.name === elem.name)
                if(containsGenre) genre.cant++
            })
        });        
    } catch (error) {
        console.error("FALLA DE DATOS:", error);
    }
    return listGenres
}

export const userWeek = async(sid) => {
    try {
        const { data } = await axios.get(`${URL}dashboard/${sid}`);
        console.log(data.users);
    } catch (error) {
        console.log(error);
    }
}
