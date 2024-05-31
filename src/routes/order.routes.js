const express = require('express');
const {getOrders, placeOrder, getSecondHighestOrder,getUserWiseOrderSummary, getMonthlyOrdersAnalysis2024, getProductSoldInLessThan3Times} = require('../controllers/order.controller');
const {verifyJWT} = require('../middlewares/auth.middleware');
const router = express.Router();


router.route('/').get(verifyJWT, getOrders);
router.route('/place').post(verifyJWT, placeOrder);
router.route('/second-highest-order').get(getSecondHighestOrder)
router.route('/monthly-order-analysis').get(getMonthlyOrdersAnalysis2024)
router.route('/user-wise-order-summary').get(getUserWiseOrderSummary);
router.route('/product-sold-lessthan-3times').get(getProductSoldInLessThan3Times);

module.exports = router;
