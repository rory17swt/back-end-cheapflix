import express from 'express'
import Comment from '../models/comment.js'
import isSignedIn from '../middleware/isSignedIn'
import errorHandler from '../middleware/errorHandler.js'
import { Forbidden, NotFound } from '../utils/error.js'

const router = express.Router

// create, update and delete



export default router
