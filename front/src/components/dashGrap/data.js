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

export const userDay = async(sid) => {
    try {
        const { data } = await axios.get(`${URL}dashboard/${sid}`);

        // Objeto para almacenar usuarios agrupados por día
        const groupedUsers = [];
        // Iterar sobre cada usuario y agruparlo por día
        data.users.forEach(user => {
            // Obtener la fecha de creación del usuario
            const createdAt = new Date(user.createdAt);
            // Formatear la fecha en formato YYYY-MM-DD
            const formattedDate = `${createdAt.getFullYear()}-${(createdAt.getMonth() + 1)
                .toString().padStart(2, '0')}-${createdAt.getDate().toString().padStart(2, '0')}`;
            // Verificar si ya existe una entrada para esta fecha en groupedUsers
            if (!groupedUsers[formattedDate]) {
                // Si no existe, crear una nueva entrada con un arreglo vacío
                groupedUsers[formattedDate] = [];
            }
            // Agregar el usuario al arreglo correspondiente a esta fecha
            groupedUsers[formattedDate].push(user);
            groupedUsers[formattedDate].cant = groupedUsers[formattedDate].length
        });
        // Ahora groupedUsers contendrá los usuarios agrupados por día
        return groupedUsers;

    } catch (error) {
        console.error("FALLA DE DATOS:", error);
    }
}
