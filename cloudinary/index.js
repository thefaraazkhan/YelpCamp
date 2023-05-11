const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'YelpCamp',
        allowedFormats: ['jpeg', 'png', 'jpg']
    }
});


// Below code will help transform all images to same size
// const storage = new CloudinaryStorage({
//     cloudinary,
//     params: {
//         folder: 'YelpCamp',
//         allowedFormats: ['jpeg', 'png', 'jpg', 'heic'],
//         transformation: [
//             { width: 400, height: 300, gravity: "auto", crop: "fill" },
//         ], 
//         format: 'jpg'
//     }
// });

module.exports = {
    cloudinary,
    storage
}