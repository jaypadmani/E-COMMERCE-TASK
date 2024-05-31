const express = require('express');
const {signupUser, loginUser, logoutUser} = require('../controllers/user.controller');

const router = express.Router();


router.route('/signup').post(signupUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);

module.exports = router;
