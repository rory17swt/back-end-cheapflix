import express from 'express'
import Movie from '../models/movie'
import errorHandler from '../middleware/errorHandler'
import isSignedIn from '../middleware/isSignedIn'
import { Forbidden, NotFound } from '../utils/error'
import User from '../models/user'
import Comment from '../models/comment'

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
