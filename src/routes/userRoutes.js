const express = require('express');

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const isAuth  = require('../middlewares/isAuth');
const { uploadUserPhoto, resizeUserPhoto } = require('../middlewares/upload');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.post('/forgotpassword', authController.forgotPassword);
router.post('/resetpassword/:token', authController.resetPassword);
router.get('/:username', userController.getUser);
router.use(isAuth);
router.put('/', uploadUserPhoto, resizeUserPhoto, userController.updateUser);

module.exports = router;
