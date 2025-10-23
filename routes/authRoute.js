// routes/auth.routes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Signup
router.post('/signup', authController.signup);

// Signin
router.post('/signin', authController.signin);

//refresh token
router.post('/refresh-token', authController.refreshToken);

//logout
router.post('/logout', authController.logout);

// Email verification
router.get('/verify/:token', authController.verifyEmail);

//Email test
router.post('/send-test-email', authController.testEmail);

module.exports = router;
