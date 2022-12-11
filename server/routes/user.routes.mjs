
import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import User from '../db.mjs';

const router = express.Router();
const DIR = './public/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "application/pdf" || file.mimetype == "application/msword" || file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.mimetype == "text/plain") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
// User model

router.post('/user-profile', upload.single('user_syllabus'), async (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    console.log(req.file);
    const email = req.body.email;
    const courseName = req.body.courseName;
    const syllabus = url + '/public/' + req.file.filename;
    console.log(courseName, syllabus, email);
    console.log(email, url + '/public/' + req.file.filename );
    const user = await User.findOne({"email": email});
    const courseDict = user.course;
    courseDict[courseName]['syllabus'] = syllabus;
    user.updateOne({'$set': {course: courseDict}}).then(result => {
        console.log(user.course);
        user.save();
        res.status(201).json({
            message: "success",
            course: user.course
        })
      }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
      })
    console.log(user.course);
});

router.get("/", (req, res, next) => {
    User.find().then(data => {
        res.status(200).json({
            message: "User list retrieved successfully!",
            users: data
        });
    });
});
export default router;