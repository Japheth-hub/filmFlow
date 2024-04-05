module.exports= (data)=>{
    let status = false;
    const errors = {};
    const {name, director, genres, description, countries, posterFile, movieFile, trailerFile} = data;
    ["name", "director", "genres", "description", "countries", "posterFile", "movieFile", "trailerFile"].map((item)=>{
         if(!data[item]) errors[item] = `Este un campo requerido`;
    })
    
    if(Object.keys(errors).length === 0) status = true;

    return {status,errors};
}