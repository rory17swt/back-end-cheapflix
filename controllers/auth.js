import express from 'express'
import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import errorHandler from '../middleware/errorHandler.js'
import { Unauthorized, UnprocessableEntity } from '../utils/error.js'

const router = express.Router()

// Routes
router.post('/register', async (req, res) => {
  try {
        console.log(' Incoming registration data:', req.body)

    const { email, username, password, passwordConfirmation } = req.body
    console.log('Received:', req.body)

    if (password !== passwordConfirmation) {
      throw new UnprocessableEntity('Passwords do not match!')
    }

    const hashedPassword = bcrypt.hashSync(password)

    const user = await User.create({
      email,
      username,
      password: hashedPassword
    })

    return res.status(201).json({ message: `Hello ${user.username}` })
  } catch (error) {
    errorHandler(error, res)
  }
})


router.post('/signIn', async (req, res) => {
    try {
        const { email, password } = req.body
        // Find the user
        const userToSignIn = await User.findOne({ email })
        //If user not found, unauthorized
        if (!userToSignIn) {
            throw new Unauthorized()
        }
        // If passwords don't match, unauthorized
        if (!bcrypt.compareSync(password, userToSignIn.password)) {
            throw new Unauthorized()
        }
        // If theres a match, create a JWT
        const payload = {
            user: {
                _id: userToSignIn._id,
                username: userToSignIn.username
            }
        }
        const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '3d'})
        // Send the response
        return res.json({ token })
    } catch (error) {
        errorHandler(error, res)
    }
})


export default router





// pre fix 
// fix 
//         const {email, username, password, passwordConfirmation} = req.body 
       
//         if (req.body.password !== req.body.passwordConfirmation) {
//             throw new UnprocessableEntity('Passwords do not match!')
//         }
//         req.body.password = bcrypt.hashSync(req.body.password)
//         const user = await User.create(req.body)

//         return res.status(201).json({ message: `Hello ${user.username}` })
//     } catch (error) {
//         errorHandler(error, res)
//     }
// })

//    try {

//         // fix 
//         const {email, username, password, passwordConfirmation} = req.body 
       
//         if (password !== passwordConfirmation) {
//             throw new UnprocessableEntity('Passwords do not match!')
//         }
        
//         req.body.password = bcrypt.hashSync(req.body.password)
//         const user = await User.create(req.body)

//         return res.status(201).json({ message: `Hello ${user.username}` })
//     } catch (error) {
//         errorHandler(error, res)
//     }
// })