const db = require('../db/index');
const {v4: uuidv4} = require('uuid');


const addItemToCart = async (userId, productId, quantity,price) => {
  try {
    const uuid = uuidv4();
    const result = await db.query(
      'INSERT INTO cart (id, user_id, product_id, quantity, price) VALUES ($1, $2, $3, $4,$5) RETURNING *',
      [uuid,userId, productId, quantity, price]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Error adding product to cart:', err);
    throw err;
  }
};

const getCartItemByUserId = async (userId) => {
   try{
     const result = await db.query(
       'SELECT * FROM cart WHERE user_id = $1',
       [userId]
     );
     return result.rows;

   }catch(err){
     console.error('Error finding cart by user id:', err);
     throw err;
   }
}


const clearCartItem = async(userId) =>{
  try{
    const result = await db.query(
      'DELETE FROM cart WHERE user_id = $1',
      [userId]
    );
    return result.rows;

  }catch(err){
    console.error('Error clearing cart by user id:', err);
    throw err;
  }
}

module.exports = {
  addItemToCart,
  getCartItemByUserId,
  clearCartItem
};
