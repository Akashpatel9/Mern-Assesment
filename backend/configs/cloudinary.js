import { v2 as cloudinary } from 'cloudinary';

export const configCloudinary = async () => {
    await cloudinary.config({
        cloud_name: 'dzrbu2gkv',
        api_key: '459741979544194',
        api_secret: 'SOuJyCs6hwFEnR2XZujMadmDQpk'
    });
}
