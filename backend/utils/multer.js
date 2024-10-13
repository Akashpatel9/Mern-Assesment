import multer from "multer";

// Configure Multer for temporary local storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Set up the upload middleware with size limits and file type filtering
export const upload = multer({
    storage
});
