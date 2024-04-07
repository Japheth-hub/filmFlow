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
        return("FALLA DE DATOS movies:", error);
    }
    return listGenres
}

export const userDay = async(sid) => {
    let dataGrap = []
    try {
        const { data } = await axios.get(`${URL}users/${sid}`);
        // Objeto para almacenar usuarios agrupados por día
        const groupedUsers = [];
        // Iterar sobre cada usuario y agruparlo por día
        data.forEach(user => {
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
        const result = {
            labels: [],
            data: []
        };
        // Iterar sobre las claves del objeto groupedUsers para extraer las fechas y la cantidad de usuarios
        let maxUsers = 0;
        for (const date in groupedUsers) {
            if (groupedUsers.hasOwnProperty(date)) {
                const users = groupedUsers[date];

                result.labels.push(date); // Agregar la fecha al arreglo de etiquetas
                result.data.push(users.length); // Agregar la cantidad de usuarios al arreglo de datos
            }
        }
        return result;

    } catch (error) {
        return("FALLA DE DATOS userXday:", error);
    }
}

export const salesDay = async(sid) => {
    try {
        const { data } = await axios.get(`${URL}purchases/${sid}`);
        // Objeto para almacenar ventas agrupados por día
        const groupedSales = [];
        // Iterar sobre cada venta y agruparlo por día
        data.forEach(sale => {
            // Obtener la fecha de creación del usuario
            const createdAt = new Date(sale.createdAt);
            // Formatear la fecha en formato YYYY-MM-DD
            const formattedDate = `${createdAt.getFullYear()}-${(createdAt.getMonth() + 1)
                .toString().padStart(2, '0')}-${createdAt.getDate().toString().padStart(2, '0')}`;
            // Verificar si ya existe una entrada para esta fecha en groupedSales
            if (!groupedSales[formattedDate]) {
                // Si no existe, crear una nueva entrada con un arreglo vacío
                groupedSales[formattedDate] = [];
            }
            // Agregar la venta al arreglo correspondiente a esta fecha
            groupedSales[formattedDate].push(sale);
        });
        const result = {
            labels: [],
            data: []
        };
        // Iterar sobre las claves del objeto groupedSales para extraer las fechas y la cantidad de ventas
        let maxSales = 0;
        for (const date in groupedSales) {
            if (groupedSales.hasOwnProperty(date)) {
                const sales = groupedSales[date];
                const salesAmount = sales.reduce((total, sale) => total + parseFloat(sale.amount), 0);          
                /// Agregar la fecha al arreglo de etiquetas
                result.labels.push(date);
                
                // Agregar el saldo de ventas al arreglo de datos
                result.data.push(salesAmount);
            }
        }
        return result;

    } catch (error) {
        return("FALLA DE DATOS salesXday:", error);
    }
}

export const revrankGenre = async() => {
    let dataGrap;
    try {
        const { data } = await axios.get(`${URL}reviews`);
        dataGrap = data

        return dataGrap
    } catch (error) {
        return("FALLA DE DATOS revrankXgenre:", error);
    }
}