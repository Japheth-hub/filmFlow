module.exports = (date)=>{
    date = new Date(date);

    date.setUTCHours(0, 0, 0, 0);

    if(!isNaN(date.getTime())){
        console.log("la fecha es válida");
        const current = new Date();
        current.setUTCHours(0, 0, 0, 0);
        console.log("Date",date);
        console.log("Current",current);
        const isFuture = date >= current
        return isFuture;
    }else{
        return false
    }
}

