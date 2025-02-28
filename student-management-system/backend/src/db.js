const mysql = require('mysql2');
const { promisify } = require('util');
const { createCredentialsTableSQL, createStudentsTableSQL } = require('./dbQueries');
require('dotenv').config();

let pool;

const createPool = () => {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'admin',
      password: process.env.DB_PASSWORD || 'admin',
      database: process.env.DB_NAME || 'student-management-system',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error connecting to MySQL Database:', err);
        throw err;
      }
      console.log('Connected to MySQL Database');
      connection.release(); // return to pool
    });
  }
  return pool;
};

const query = async (sql, params) => {
  const pool = createPool();
  const queryAsync = promisify(pool.query).bind(pool);
  try {
    return await queryAsync(sql, params);
  } catch (err) {
    console.error('Database query error:', err);
    throw err;
  }
};

const createTables = async () => {
  try {
    await query(createCredentialsTableSQL);
    await query(createStudentsTableSQL);
    console.log('Tables created successfully');
  } catch (err) {
    console.error('Error creating tables:', err);
    throw err;
  }
};

module.exports = {
  query,
  createTables,
};
