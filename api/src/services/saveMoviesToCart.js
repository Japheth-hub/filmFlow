const postCart = require('../controllers/postCart')
const req = {
    "user": {
        id: 1,
        sid: '1111',
    },
    "body": {
    "movies": [
      {
        "id": 2,
        "name": "The Matrix",
        "poster": "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg"
      },
      {
        "id": 6,
        "name": "The Green Mile",
        "poster": "https://image.tmdb.org/t/p/original/velWPhVMQeQKcxggNEU8YmIo52R.jpg"
      },
      {
        "id": 9,
        "name": "The Lion King",
        "poster": "https://media.themoviedb.org/t/p/w220_and_h330_face/b0MxU37dNmMwKtoPVYPKOZSIrIn.jpg"
      },
      {
        "id": 12,
        "name": "The Godfather",
        "poster": "https://image.tmdb.org/t/p/original/3bhkrj58Vtu7enYsRolD1fZdja1.jpg"
      }
    ]
    }
  }


module.exports = async () => {
    try {
        const created = await postCart(req)
        if(created) {
            console.log('Successfully created 4 reviews')
        }
    } catch (error) {
        return error
    }
}