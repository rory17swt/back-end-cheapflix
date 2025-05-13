export default function errorhandler(error, res) {
    console.log(error)

    let { status, field, message } = error

    // Global response
    return res.status(status).json({ [field]: message })
}