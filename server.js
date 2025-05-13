import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import 'dotenv/config'

// Router imports/Controllers
import authRouter from './controllers/auth.js'

const app = express()
const port = process.env.PORT


// Middleware
app.use(express.json())
app.use(morgan('dev'))


// Routers
app.use('/api', authRouter)


// 404 Route
app.use('/{*any}', (req, res) => {
    return res.status(404).json({ message: 'Page not found' })
})


// Connect to servers
const startServers = async() => {
    try {
        await mongoose.connect(process.env.MONGOBD_URI)
        console.log('DB connection established')
        app.listen(port, () => console.log(`Server started on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}
startServers()