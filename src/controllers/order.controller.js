const db = require('../db/index');
const { ApiError } = require('../utils/ApiError');
const { ApiResponse} = require('../utils/ApiResponse');
const { asyncHandler } = require('../utils/asyncHandler');
const {createOrder,addOrderItem, getOrderByUserId} = require('../models/order.model');
const { getCartItemByUserId, clearCartItem } = require('../models/cart.model');

const placeOrder = asyncHandler(async(req,res)=>{

    const userId = req.user.id;

    const items = await getCartItemByUserId(userId);

    if (!items || !Array.isArray(items) || items.length === 0) {
        throw new ApiError(400, "Order items are required.");
    }
    let total = 0;

    for (const item of items) { 
        if(!item.product_id || !item.quantity || item.quantity <0){
            throw new ApiError(400, "Each item must have product_id and quantity")
        }   
        total += item.price * item.quantity;
    }

    const order = await createOrder(userId, total, 'Pending');

    for (const item of items) {
        await addOrderItem(order.id, item.product_id, item.quantity, item.price);
    }

    await clearCartItem(userId);

    return res.status(201).json(
        new ApiResponse(201, order, "Order Placed Successfully.")
    )
})

const getOrders = asyncHandler(async(req,res) =>{
    const userId = req.user.id;

    const orders = await getOrderByUserId(userId);
  
    res.status(200).json(new ApiResponse(200, orders, "Orders Get Successfully."));
   
})

const getSecondHighestOrder = asyncHandler(async (req, res) =>{
     const result =  await db.query(`
        SELECT *
        FROM orders
        ORDER BY total DESC
        LIMIT 1 OFFSET 1;`
     );
     
     res.status(200).json(new ApiResponse(200, result.rows, "Second highest order get sucessfully."))
})

const getMonthlyOrdersAnalysis2024 = asyncHandler(async(req,res)=>{
    const result =  await db.query(`
        SELECT EXTRACT(MONTH FROM created_at) AS month, COUNT(*) AS total_orders
        FROM orders
        WHERE EXTRACT(YEAR FROM created_at) = 2024
        GROUP BY EXTRACT(MONTH FROM created_at)
        ORDER BY EXTRACT(MONTH FROM created_at);`
    );

    res.status(200).json(new ApiResponse(200, result.rows, "Monthly orders analysis get sucessfully."))
})

const getProductSoldInLessThan3Times = asyncHandler(async(req,res)=>{
    const result = await db.query(`
    SELECT
        oi.product_id,
        COUNT(*) AS total_sales
    FROM
        order_items oi
        JOIN orders o ON oi.order_id = o.id
    WHERE
        o.created_at >= '2024-03-01'
        AND o.created_at < '2024-06-01'
    GROUP BY
        oi.product_id
    HAVING
        COUNT(*) < 3
    ORDER BY
        oi.product_id ASC;`
    )
    res.status(200).json(new ApiResponse(200, result.rows,"Product which are sold less than 3 times get successfully."))
})

const getUserWiseOrderSummary = asyncHandler(async (req,res)=>{
    const result = await db.query(
     `
     SELECT
         u.id AS user_id,
         u.username,
         COUNT(DISTINCT o.id) AS total_orders,
         SUM(oi.quantity) AS total_products,
         SUM(o.total) AS total_order_value
     FROM
         users u
         JOIN orders o ON u.id = o.user_id
         LEFT JOIN order_items oi ON o.id = oi.order_id
     GROUP BY
         u.id,
         u.username
     ORDER BY
         total_order_value DESC;
     `
    )

    res.status(200).json(new ApiResponse (200, result.rows, "User wise Ordering Summary get Sucessffully."))
});

module.exports = {
    getOrders,
    placeOrder,
    getSecondHighestOrder,
    getMonthlyOrdersAnalysis2024,
    getProductSoldInLessThan3Times,
    getUserWiseOrderSummary
}