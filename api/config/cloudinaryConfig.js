import { v2 as cloudinaryConfig } from 'cloudinary';

cloudinaryConfig.config({ 
    cloud_name: 'dkmamqd9b', 
    api_key: process.env.CLOUDINARY_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET
});

export default cloudinaryConfig;
