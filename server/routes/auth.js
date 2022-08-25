const express = require('express');
const router = express.Router();

// import controller
const {
    signup,
   
    upload,
    // accountActivation,
    signin,
    forgotPassword,
    resetPassword,
 
} = require('../controllers/auth');

// import validators
const {
    userSignupValidator,
    userSigninValidator,
    forgotPasswordValidator,
    resetPasswordValidator
} = require('../validators/auth');
const { runValidation } = require('../validators');

router.post('/signup',upload.single("photo"), userSignupValidator, runValidation, signup);
router.post('/signin', userSigninValidator, runValidation, signin);
// forgot reset password
router.put('/forgot-password', forgotPasswordValidator, runValidation, forgotPassword);
router.put('/reset-password', resetPasswordValidator, runValidation, resetPassword);


module.exports = router;