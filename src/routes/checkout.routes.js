const express = require('express');
const router = express.Router();
const { checkout } = require('../controllers/checkout.controller');
const {verifyJWT} = require('../middlewares/auth.middleware');


router.post('/:orderId', verifyJWT, checkout);

module.exports = router;
