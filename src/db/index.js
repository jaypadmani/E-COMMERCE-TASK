const { Pool } = require("pg");
const { DB_NAME } = require("../constants");

const pool = new Pool({
  connectionString: `${process.env.DATABASE_URL}/${DB_NAME}`,
});

module.exports = pool;
