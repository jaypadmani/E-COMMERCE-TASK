const db = require('../db/index');
const {v4: uuidv4} = require('uuid');

const createUser = async (username, email, password) => {
  try {
    const uuid = uuidv4();
    const result = await db.query(
      'INSERT INTO users (id, username, email, password) VALUES ($1, $2, $3,$4)  RETURNING id, username, email, created_at',
      [uuid,username, email, password]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Error creating user:', err);
    throw err;
  }
};

const checkIfUserExists = async (username, email) => {
  try {
    const result = await db.query(
      'SELECT * FROM users WHERE username = $1 OR email = $2',
      [username, email]
    );
    return result.rows.length > 0;
  } catch (err) {
    console.error('Error checking user existence:', err);
    throw err;
  }
};

const findUserByEmailOrUsername = async (email, username) => {
  try {
    const result = await db.query(
      'SELECT * FROM users WHERE email = $1 OR username = $2',
      [email,username]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Error finding user by email or username:', err);
    throw err;
  }
};

const findUserById = async (id) => {
  try {
    const result = await db.query(
      'SELECT id, username, email, created_at FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Error finding user by id:', err);
    throw err;
  }
};


module.exports =  {createUser, findUserByEmailOrUsername,checkIfUserExists,findUserById};