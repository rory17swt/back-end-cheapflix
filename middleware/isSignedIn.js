import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import errorhandler from './errorHandler.js'
import { Unauthorized } from '../utils/error.js'

export default async function isSignedIn(req, res, next) {
    try {
        // Find jwt
        const authHeader = req.headers.authorization
        // If jwt not found, unathorized
        if (!authHeader) {
            console.log('Headers not found')
            throw new Unauthorized()
        }
        // Take the 2nd section of jwt
        const token = authHeader.split(' ')[1]
        // Verify the jwt
        const { user } = jwt.verify(token, process.env.TOKEN_SECRET)
        // Verify that the user and the token payload still exist
        const userToVerify = await User.findById(user._id)
        // Can't find user to verify, unauthorized
        if (!userToVerify) {
            console.log('User does not exist')
            throw new Unauthorized()
        }
        // If user exsist, send to next middleware
        req.user = userToVerify
        next()
    } catch (error) {
        console.log(error.message)
        errorhandler(error, res)
    }
}