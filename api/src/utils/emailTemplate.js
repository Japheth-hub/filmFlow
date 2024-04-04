const fs = require('fs');
const path = require('path');

const stylesPath = path.resolve(__dirname, 'styles.css');
const styles = fs.readFileSync(stylesPath, 'utf8');

module.exports = (username, body) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Template</title>
        <style>${styles}</style>
    </head>
    <body>
        <div class="container">
            <img class="logo" alt="FilmFlow" src="https://res.cloudinary.com/dtn2ewtqg/image/upload/v1712262629/posters/kshbvp1tkrourvnnpnbs.png">
            <p class="text">Hola ${username},</p>
            <p class="text">${body}</p>
        </div>
    </body>
    </html>
    `;
};
