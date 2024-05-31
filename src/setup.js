const db = require('./db/index.js');
const { createUsersTable } = require("./table/user.table.js");
const { createOrdersTable } = require("./table/order.table.js");
const { createCartTable } = require('./table/cart.table.js');
const { createOrdersItemTable } = require('./table/orderItem.table.js');


async function setupTables(){
    try{
       await createUsersTable();
       await createOrdersTable();
       await createCartTable();
       await createOrdersItemTable();

    }catch(err){
        console.error("Error During Create Tables:", err);
        throw err;
    }
}


module.exports = {setupTables};