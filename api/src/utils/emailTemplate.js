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
    </head>
    <body>
        <div style="margin: 0 auto; max-width: 100%; padding: 20px;">
            <div style="background-color: #bb92eb; padding: 20px; text-align: center;">
                <h2 style="color: white;">¡Hola ${username}!,</h2>
            </div>
            <div style="background-color: #8b33f0; padding: 20px; text-align: center; height: 200px;">
                <p style="color: white;">${body}</p>
            </div>
            <div style="background-color: #8b33f0; padding: 20px; text-align: center;">
                <a href="https://filmflow.chekogarcia.com.mx/"> <img style="max-width: 100%; height: auto;" alt="FilmFlow" src="https://filmflow.chekogarcia.com.mx/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo-color-light-expanded.5dbd941f.png&w=1920&q=75"</img> </a>
            </div>
        </div>
    </body>
    </html>
    `;
};