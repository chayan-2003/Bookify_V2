import express from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import s3 from "../config/awsConfig.js";
const AWS_BUCKET_NAME = 'baidyabatibookings';

const storage = multerS3({
    s3: s3,
    bucket: AWS_BUCKET_NAME,
    metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
        cb(null, `Social_Media/${Date.now()}_${file.originalname}`);
    },
    contentType: multerS3.AUTO_CONTENT_TYPE, 
});


const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed!"), false);
    }
};

// Multer configuration
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});

export default upload;
