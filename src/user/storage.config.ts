import { diskStorage } from 'multer'

export const storage = diskStorage({
    destination: "./uploads/avatars",
    filename: (req, file, callback) => {
        callback(null, generateFilename(file))
    }
})

function generateFilename(file: Express.Multer.File) {
    return `${Date.now()}.${Math.floor(Math.random() * 100)}.${file.originalname}`
}