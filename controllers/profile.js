import express from 'express'
import Movie from '../models/movie.js'
import errorHandler from '../middleware/errorHandler.js'
import isSignedIn from '../middleware/isSignedIn.js'
import { Forbidden, NotFound } from '../utils/error.js'
import User from '../models/user.js'
import Comment from '../models/comment.js'

const router = express.Router()

// GET /api/profile/:profileId — only the signed-in user can view their own profile
router.get('/profile/:profileId', isSignedIn, async (req, res) => {
      console.log('profile route hit')

  try {
    const { profileId } = req.params

    // Check access
    if (req.user._id.toString() !== profileId) {
      throw new Forbidden('You are not allowed to view this profile.')
    }

    // Get user (minimal info)
    const user = await User.findById(profileId).select('username email')
    if (!user) throw new NotFound('User not found.')

    // Get their movies
    const movies = await Movie.find({ owner: profileId })

    // Get their comments (with movie title)
    const comments = await Comment.find({ author: profileId })
      .populate('movie', 'title')

    return res.json({ user, movies, comments })

  } catch (error) {
    errorHandler(error, res)
  }
})

export default router
