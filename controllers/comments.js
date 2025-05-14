import express from 'express'
import Comment from '../models/comment.js'
import isSignedIn from '../middleware/isSignedIn.js'
import errorHandler from '../middleware/errorHandler.js'
import { Forbidden, NotFound } from '../utils/error.js'

const router = express.Router()

// Create
router.post('/comments', isSignedIn, async (req, res) => {
    try {
        req.body.author = req.user._id
        const comment = await Comment.create(req.body)
        return res.status(201).json(comment)
    } catch (error) {
        errorHandler
    }
})

// Update
router.put('/comments/:commentId', isSignedIn, async (req, res) => {
    try {
        const { commentId } = req.params
        const comment = await Comment.findById(commentId)

        if (!comment) throw new NotFound('Could not find comment')
        if (!comment.author.equals(req.user._id)) throw new Forbidden()
            
        const updatedComment = await Comment.findByIdAndUpdate(commentId, req.body, { new: true })
        return res.json(updatedComment)
    } catch (error) {
        errorHandler(error, res)
    }
})

// Delete
router.delete('/comments/:commentId', isSignedIn, async (req, res) => {
    try {
        const { commentId } = req.params
        const comment = await Comment.findById(commentId)

        if (!comment) throw new NotFound('Could not find comment')
        if (!comment.author.equals(req.user._id)) throw new Forbidden()

        await Comment.findByIdAndDelete(commentId)
        return res.sendStatus(204)
    } catch (error) {
        errorHandler(error, res)
    }
})


export default router
