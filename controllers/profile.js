import express from 'express'
import Movie from '../models/movie.js'
import errorHandler from '../middleware/errorHandler.js'
import isSignedIn from '../middleware/isSignedIn.js'
import { Forbidden, NotFound } from '../utils/error.js'
import User from '../models/user.js'
import Comment from '../models/comment.js'

const router = express.Router()

// Routes 

// Index 
router.get('/profile/profileId', isSignedIn, async (req,res) => {
    try {
const { profileId } = req.params 
const user = await User.findById(profileId)
const movies = await Movie.find({owner: profileId})
const comments = await Comment.find({author:profileId}).populate(movie.title)
// if (!user) throw new NotFound('Profile not found')


return res.json({user,movies,comments})


    } catch (error) {
        errorHandler(error,res)
    }
})

export default router
