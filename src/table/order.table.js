const db = require("../db/index.js");

async function createOrdersTable() {
  try {
    await db.query(`
        CREATE TABLE IF NOT EXISTS orders (
          id UUID PRIMARY KEY,
          user_id UUID NOT NULL,
          total DECIMAL(10, 2) NOT NULL,
          status VARCHAR(50) DEFAULT 'Pending',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id)
        );
    `);
    console.log("Orders table created successfully.");
  } catch (error) {
    console.error("Error creating orders table:", error);
    throw error; 
  }
}

module.exports = {createOrdersTable};
