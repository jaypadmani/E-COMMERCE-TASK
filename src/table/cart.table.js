const db = require("../db/index.js");

async function createCartTable() {
  try {
    await db.query(`
        CREATE TABLE IF NOT EXISTS cart (
            id UUID PRIMARY KEY,
            user_id UUID REFERENCES users(id),
            product_id INTEGER NOT NULL,
            quantity INTEGER NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);
    console.log("Cart table created successfully.");
  } catch (error) {
    console.error("Error creating cart table:", error);
    throw error; 
  }
}

module.exports = {createCartTable};
