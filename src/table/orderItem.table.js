const db = require("../db/index.js");

async function createOrdersItemTable() {
  try {
    await db.query(`
        CREATE TABLE IF NOT EXISTS order_items (
            id UUID PRIMARY KEY,
            order_id UUID NOT NULL,
            product_id INT NOT NULL,
            quantity INT NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            FOREIGN KEY (order_id) REFERENCES orders(id)
        );      
    `);
    console.log("OrdersItem table created successfully.");
  } catch (error) {
    console.error("Error creating orders Item table:", error);
    throw error; 
  }
}

module.exports = {createOrdersItemTable};
