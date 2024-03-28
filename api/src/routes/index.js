const {Router} = require('express')
const {movies} = require('./api')
const moviesRouter = require('./moviesRouter')
const genresRouter = require('./genresRouter')
const reviewsRouter = require('./reviewsRouter')
const usersRouter = require('./usersRouter')
const cartRouter = require('./cartRouter')
const checkoutRouter = require('./checkoutRouter')

const router = Router()

router.get('/fake', async (req, res)=>{
    res.status(200).json(movies)
})
router.get('/', async (req, res)=>{
    res.status(200).json({"message":"welcome"})
})
router.use('/users',usersRouter);
router.use('/movies',moviesRouter);
router.use('/genres',genresRouter);
router.use('/reviews',reviewsRouter);
router.use('/cart', cartRouter)
router.use('/checkout', checkoutRouter)

module.exports = router