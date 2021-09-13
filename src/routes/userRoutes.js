const express = require('express');

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const { isLogin } = require('../middlewares');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.delete('/logout', authController.logout);
router.post('/forgotpassword', authController.forgotPassword);
router.post('/resetpassword/:token', authController.resetPassword);
router.use(isLogin);
router.get('/:username', userController.getUser);

module.exports = router;
