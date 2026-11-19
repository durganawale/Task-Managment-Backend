const express=require('express')
const router = express.Router()
const userControllers=require('../controllers/userControllers')
const {auth,admin}=require('../Middlewere/auth')
const upload = require('../Middlewere/upload');

router.post('/register',userControllers.register)
router.post('/login',userControllers.login)
router.get('/getuserinfo',auth,userControllers.getUserInfo)
router.get('/getallusers',auth,admin,userControllers.getAllUsers)
router.put(
    '/upload-profile-image',
    auth,
    upload.single('profileImage'),
    userControllers.uploadProfileImage
);

module.exports=router 
