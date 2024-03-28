module.exports= (data)=>{
    let status = false;
    const errors = {};
    const {name, director, genres, description, country, posterFile, movieFile, trailerFile, price} = data;
    ["name", "director", "genres", "description", "country", "posterFile", "movieFile", "trailerFile", "price"].map((item)=>{
         if(!data[item]) errors[item] = `Este un campo requerido`;
    })
    
    if(Object.keys(errors).length === 0) status = true;

    return {status,errors};
}