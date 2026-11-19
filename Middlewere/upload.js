const multer = require('multer');
const path = require('path');

// Storage configuration
const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },

    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }

});

// File type validation
const fileFilter = (req, file, cb) => {

    const allowedTypes = /jpeg|jpg|png|webp/;

    const extname = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );

    const mimetype = allowedTypes.test(file.mimetype);

    if (extname || mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Only JPG, JPEG, PNG and WEBP images are allowed'));
    }
};

// Multer configuration
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10* 1024 * 1024
    }
});

module.exports = upload;