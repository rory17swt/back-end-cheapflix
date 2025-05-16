import { v2 as cloudinary, v2 } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Cheapflix_uploads',
        format: ['png', 'jpeg', 'JPEG', 'jpg', 'webp'],
        public_id: (req, file) => {
            return Date.now() + '-' + file.originalname.split('.')[0]
        }
    }
})
const parser = multer({ storage: storage })

export default parser