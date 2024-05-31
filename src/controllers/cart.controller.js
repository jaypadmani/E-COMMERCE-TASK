const { asyncHandler } = require('../utils/asyncHandler');
const { ApiError } = require('../utils/ApiError');
const { addItemToCart } = require('../models/cart.model');
const { ApiResponse } = require('../utils/ApiResponse');

const addToCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { product_id, quantity, price } = req.body;

  if (!product_id || !quantity || quantity <= 0) {
    throw new ApiError(400, "Product ID and a valid quantity are required.");
  }

  const cartItem = await addItemToCart(userId, product_id, quantity, price);

  res.status(201).json(
    new ApiResponse(200, cartItem, "Product added to cart successfully"));
});

module.exports = {
  addToCart
};
