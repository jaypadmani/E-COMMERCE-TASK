const express = require('express');
const {addToCart} = require('../controllers/cart.controller');
const {verifyJWT} = require('../middlewares/auth.middleware');

const router = express.Router();


router.route('/add').post(verifyJWT, addToCart);

module.exports = router;
