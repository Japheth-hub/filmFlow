module.exports = (price,percentage)=>{
    const updatedPrice = Number(price) * (1 - Number(percentage) / 100);
    return Math.round(updatedPrice);
}