const pool = require('../db/index');
const {v4: uuidv4} = require('uuid');

const createOrder = async (userId, total, status = 'Pending') => {
    try{
        const uuid = uuidv4();
        const result = await pool.query(
            'INSERT INTO orders (id, user_id, total, status) VALUES ($1, $2, $3, $4) RETURNING *',
            [uuid,userId, total, status]
        );
        return result.rows[0];

    }catch(err){
        console.error('Error creating order:', err);
        throw err;
    }
};

const addOrderItem = async (orderId, productId, quantity, price) => {
    try{
        const uuid = uuidv4();
        const result = await pool.query(
            'INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [uuid,orderId, productId, quantity, price]
        );
        return result.rows[0];

    }catch(err){
        console.error('Error adding order item:', err);
        throw err;
    }
};

const getOrderById = async (orderId) => {
    try{
        const result = await pool.query(
            'SELECT * FROM orders WHERE id = $1',
            [orderId]
        );
        return result.rows[0];
        order
    }catch(err){
        console.error('Error finding order by id:', err);
        throw err;
    }
}

const updateOrderStatus = async(orderId, status) => {
    try{
        const result = await pool.query(
            'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
            [status, orderId]
        );
        return result.rows[0];

    }catch(err){
        console.error('Error updating order status:', err);
        throw err;
    }
}

const getOrderByUserId = async(userId) => {
    try{
        const result = await pool.query(
            'SELECT * FROM orders WHERE user_id = $1',
            [userId]
        );
        return result.rows;

    }catch(err){
        console.error('Error finding order by user id:', err);
        throw err;
    }
}

module.exports = {
  createOrder,
  addOrderItem,
  getOrderById,
  updateOrderStatus,
  getOrderByUserId
};
