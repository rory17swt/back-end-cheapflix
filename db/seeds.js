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
        console.log(`${deletedUsers.deletedCount} USERS deleted from db`)

        // Remove movies from the db
        const deletedMovies = await Movie.deleteMany()
        console.log(`${deletedMovies.deletedCount} MOVIES deleted from db`)

        // Remove comments from the db
        const deletedComments = await Comment.deleteMany()
        console.log(`${deletedComments.deletedCount} COMMENTS deleted from db`)

        // Create users
        const users = await User.create(userData)
        console.log(`${users.length} USERS added to db`)

        // Add owners to movie posts
        const moviesWithOwners = movieData.map((movie) => {
            movie.owner = users[Math.floor(Math.random() * users.length)]._id
            return movie
        })      

        // Create movies
        const movies = await Movie.create(moviesWithOwners)
        console.log(`${movies.length} MOVIES added to db`)

        // Add comments to authors and movies
        const commentsWithAuthors = commentData.map((comment) => {
            comment.author = users[Math.floor(Math.random() * users.length)]._id
            comment.movie = movies[Math.floor(Math.random() * movies.length)]._id
            return comment           
        })
        
        // Create comments
        const comments = await Comment.create(commentsWithAuthors)
        console.log(`${comments.length} COMMENTS added to db`)
        

        // Close connection to MongoDB
        await mongoose.connection.close()

    } catch (error) {
        console.log(error)
        await mongoose.connection.close()
    }
}
seedData()