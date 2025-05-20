import serverless from 'serverless-http'

import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import 'dotenv/config'
import cors from 'cors'

// Router imports/Controllers
import authRouter from '../.././controllers/auth.js'
import movieRouter from '../.././controllers/movies.js'
import commentRouter from '../.././controllers/comments.js'
import profileRouter from '../.././controllers/profile.js'

const app = express()



// Middleware
app.use(cors())

app.use(morgan('dev'))


// Routers
app.use('/api', authRouter)
app.use('/api', movieRouter)
app.use('/api', commentRouter)
app.use('/api', profileRouter)


// 404 Route
app.use('/{*any}', (req, res) => {
    return res.status(404).json({ message: 'Page not found' })
})


// Connect to servers
const startServers = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('DB connection established')
       
    } catch (error) {
        console.log(error)
    }
}
startServers()


export const handler = serverless(app, {
  request: (req, event) => {
    if (typeof event.body === 'string') {
      try {
        req.body = JSON.parse(event.body);
      } catch (err) {
        req.body = {};
      }
    }
  }
});