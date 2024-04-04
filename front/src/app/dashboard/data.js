import axios from 'axios';

export const data = [
    {
        id: 1,
        day: 10,
        sold: 25
    },
    {
        id: 3,
        day: 13,
        sold: 75
    },
    {
        id: 2,
        day: 18,
        sold: 50
    },
    {
        id: 1,
        day: 12,
        sold: 25
    },
    {
        id: 4,
        day: 20,
        sold: 100
    }
];

//Function para trabajar datos

export const movieGenre = async() => {
    const URL = process.env.NEXT_PUBLIC_URL
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

export const userWeek = async() => {
    const URL = process.env.NEXT_PUBLIC_URL
    let listUsers
    try {
        const users = await axios.get(`${URL}users`);
        listUsers = users.data
        console.log(users.data);        
    } catch (error) {
        console.error("FALLA DE DATOS:", error);
    }
    return listUsers
}
