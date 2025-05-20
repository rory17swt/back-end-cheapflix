import express from 'express'
import Movie from '../models/movie.js'
import Comment from '../models/comment.js'
import isSignedIn from '../middleware/isSignedIn.js'
import errorHandler from '../middleware/errorHandler.js'
import { Forbidden, NotFound } from '../utils/error.js'
import parser from '../middleware/fileParser.js'

const router = express.Router()

// * Routes

// Index
router.get('/movies', async (req, res) => {
    try {
        const movies = await Movie.find()
        return res.json(movies)
    } catch (error) {
        errorHandler(error, res)
    }
})

// Create
router.post('/movies', isSignedIn, parser.single('movieImage'), async (req, res) => {
    try {
        if (req.file) {
            req.body.movieImage = req.file.path
        }
        req.body.owner = req.user._id
        const movie = await Movie.create(req.body)
        return res.status(201).json(movie)
    } catch (error) {
        errorHandler(error, res)
    }
})

// Show
router.get('/movies/:movieId', async (req, res) => {
    try {
        const { movieId } = req.params
        const movie = await Movie.findById(movieId)
        const comments = await Comment.find({ movie: movieId }).populate('author','username')
        return res.json({ movie, comments })
    } catch (error) {
        errorHandler(error, res)
    }
})

// Update
router.put('/movies/:movieId', isSignedIn, parser.single('movieImage'), async (req, res) => {
    try {
         if (req.file) {
            req.body.movieImage = req.file.path
        }
        const { movieId } = req.params
        const movie = await Movie.findById(movieId)

        if (!movie) throw new NotFound('Could not find movie')
        if (!movie.owner.equals(req.user._id)) throw new Forbidden()

        const updatedMovie = await Movie.findByIdAndUpdate(movieId, req.body, { new: true })
        return res.json(updatedMovie)
    } catch (error) {
        errorHandler(error, res)
    }
})

// Delete
router.delete('/movies/:movieId', isSignedIn, async (req, res) => {
    try {
        const { movieId } = req.params
        const movie = await Movie.findById(movieId)

        if (!movie) throw new NotFound('Could not find movie')
        if (!movie.owner.equals(req.user._id)) throw new Forbidden()

        await Movie.findByIdAndDelete(movieId)
        return res.sendStatus(204)
    } catch (error) {
        errorHandler(error, res)
    }
})



export default router