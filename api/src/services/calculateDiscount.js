module.exports = (price,percentage)=>{
    console.log('Price:', price);
    console.log('Percentage:', percentage);
    const updatedPrice = Number(price) * (1 - Number(percentage) / 100);
    console.log(updatedPrice);
    return updatedPrice;
}