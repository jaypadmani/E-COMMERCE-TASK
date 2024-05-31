const { asyncHandler } = require('../utils/asyncHandler');
const { ApiError } = require('../utils/ApiError');
const { ApiResponse } = require('../utils/ApiResponse');
const { getOrderById, updateOrderStatus } = require('../models/order.model');

const checkout = asyncHandler(async (req, res) => {
  const orderId = req.params.orderId; 
  const userId = req.user.id;

  const order = await getOrderById(orderId);

  if (!order || order.user_id !== userId) {
    throw new ApiError(404, "Order not found.");
  }
  const updateOrder = await updateOrderStatus(orderId, 'Completed');

  return res.status(200).json(
    new ApiResponse(200, updateOrder, "Checkout successful.")
  );
});

module.exports = {
  checkout
};
