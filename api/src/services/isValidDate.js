module.exports = (date)=>{
    date = new Date(date);
    if(!isNaN(Date.parse(date))){
        console.log("la fecha es válida");
        const current = new Date();
        return date > current;
    }else{
        return false
    }
}