export default function errorHandler(error, res) {
    console.log('error handler')
    console.log(error)

    let { name, status, field, message, code } = error

    // Validation error
    if (name === 'ValidationError') {
        const fields = Object.keys(error.errors)
        const responseBody = {}
        fields.forEach(field => {
            responseBody[field] = error.errors[field].message
        })
        return res.status(422).json(responseBody)
    }

    // Field contraint error
    if (name === 'MongoServerError' && code === 11000) {
        const field = Object.keys(error.keyValue)[0]
        return res.status(422).json({ [field]: `${field} is already taken` })
    }

    // JWT error
    if (name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid Object' })
    }

    // General response
    return res.status(status).json({ [field]: message })
}