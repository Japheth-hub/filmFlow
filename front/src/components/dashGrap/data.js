import axios from 'axios';

const URL = process.env.NEXT_PUBLIC_URL

export const data = {
    purchaseDay: 'Volúmen de ventas por día',
    purchaseMonth: 'Total de ventas en el mes',
    moviesToday: 'Total de películas agregadas hoy',
    moviesByGenre: 'Cantidad de películas por cada género',
    interactions: 'Cantidad total de votos y comentarios en las películas',
    rankingAndReviews: 'Géneros por votos y comentarios',
    usersByDay: 'Nuevos usuarios crados por día',
    totalUsers: 'Usuarios totales de la aplicación',
}
export const movieGenre = async(sid) => {
    let listMoviesGenres = [[],[]]
    try {
        const { data } = await axios.get(`${URL}dashboard/${sid}`);
        data.totalMoviesByGenre.map(elem =>{
            listMoviesGenres[[0]].push(elem.name)
            listMoviesGenres[[1]].push(elem.movies)
        })
        return listMoviesGenres;
        
    } catch (error) {
        return("FALLÓ movieGenre:", error);
    }
}
export const totalMoviesDay = async(sid) => {
    try {
        const { data } = await axios.get(`${URL}dashboard/${sid}`);
        return data.totalMoviesToday
    } catch (error) {
        return("FALLÓ totalMoviesDay:", error);
    }
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
        return("FALLÓ userXday:", error);
    }
}
export const totalUsers = async(sid) => {
    try {
        const { data } = await axios.get(`${URL}users/${sid}`);
        return data.length
    } catch (error) {
        return("FALLÓ totalUsers:", error);
    }
}
export const salesDay = async(sid) => {
    try {
        const { data } = await axios.get(`${URL}dashboard/${sid}`);
        const groupedSales = [];
        data.purchasesMonth.forEach(sale => {
            // Obtener la fecha de creación del usuario
            const createdAt = new Date(sale.createdAt);
            // Formatear la fecha en formato YYYY-MM-DD
            const formattedDate = `${createdAt.getFullYear()}-${(createdAt.getMonth() + 1)
                .toString().padStart(2, '0')}-${createdAt.getDate().toString().padStart(2, '0')}`;
            // Verificar si ya existe una entrada para esta fecha en groupedSales
            if (!groupedSales[formattedDate]) {
                // Si no existe, crear una nueva entrada con un arreglo vacío
                groupedSales[formattedDate] = [];
            }// Agregar la venta al arreglo correspondiente a esta fecha
            groupedSales[formattedDate].push(sale);
        });
        const result = [[],[]];
        // Iterar sobre las claves del objeto groupedSales para extraer las fechas y la cantidad de ventas
        let maxSales = 0;
        for (const date in groupedSales) {
            if (groupedSales.hasOwnProperty(date)) {
                const sales = groupedSales[date];
                const salesAmount = sales.reduce((total, sale) => total + parseFloat(sale.amount), 0);
                result[[0]].push(date);
                result[[1]].push(salesAmount);
            }
        }
        return result;

    } catch (error) {
        return("FALLÓ salesXday:", error);
    }
}
export const totalSalesMonth = async(sid) => {
    try {
        const { data } = await axios.get(`${URL}dashboard/${sid}`);
        return data.totalPurchasesMonth
    } catch (error) {
        return("FALLÓ totalSalesMonth:", error);
    }
}