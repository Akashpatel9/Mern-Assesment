import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

export const uploadToCloudinary = async (filePath, originalFilename) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: 'raw',
            folder: 'resumes',
            public_id: path.parse(originalFilename).name
        });

        // After successful upload, delete the file from the server
        await fs.unlinkSync(filePath);

        return result;
    } catch (error) {
        throw new Error("File upload failed: " + error.message);
    }
};
