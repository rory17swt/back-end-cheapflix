import mongoose from 'mongoose'

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Oops, you forgot to provide your movie title!']
    },
    director: {
        type: String,
        required: [true, 'Oops, you forgot to provide a director!']
    },
    runTime: {
        type: Number,
        required: [true, 'Oops, you forgot to provide a run time!']
    },
    tags: {
        type: [String],
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    movieImage: {
        type: String,
        // required: [true, 'Oops, you forgot to provide a movie image!']
    }
})

const Movie = mongoose.model('Movie', movieSchema)

export default Movie

