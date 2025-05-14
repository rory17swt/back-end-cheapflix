import mongoose from 'mongoose'
import 'dotenv/config'

// * Models
import User from '../models/user.js'
import Movie from '../models/movie.js'
import Comment from '../models/comment.js'

// * Seed data
import userData from './data/users.js'
import movieData from './data/movies.js'
import commentData from './data/comments.js'

async function seedData() {
    try {
        // Connect to mongoose
        await mongoose.connect(process.env.MONGOBD_URI)
        console.log('DB connection established')

        // Removes users from db
        const deletedUsers = await User.deleteMany()
        console.log(`${deletedUsers.deletedCount} USERS deleted from the db`)

        // Remove movies from the db
        const deletedMovies = await Movie.deleteMany()
        console.log(`${deletedMovies.deletedCount} MOVIES deleted from db`)

        // Remove comments from the db
        const deletedComments = await Comment.deleteMany()
        console.log(`${deletedComments.deletedCount} COMMENTS deleted from db`)

        // Create users

        // Add owners to movie posts

        // Add authors to comments

        // Create movies

        // Add comments to movies

        // Create comments

        // Close connection to MongoDB

    } catch (error) {
        console.log(error)
        await mongoose.connection.close()
    }
}
seedData()