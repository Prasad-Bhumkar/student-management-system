const mysql = require('mysql2');
const { promisify } = require('util');
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
        return;
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
    console.log('Database query error');
    return;
  }
};

const createTables = async () => {
  const createStudentsTableSQL = `
    CREATE TABLE IF NOT EXISTS students (
      id INT AUTO_INCREMENT PRIMARY KEY,
      firstName VARCHAR(100),
      lastName VARCHAR(100),
      email VARCHAR(100),
      studentId VARCHAR(50),
      dateOfBirth DATE,
      enrollmentDate DATE,
      major VARCHAR(100)
    );
  `;

  const createCredentialsTableSQL = `
    CREATE TABLE IF NOT EXISTS credentials (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      remember_me BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `;

  const createCoursesTableSQL = `
    CREATE TABLE IF NOT EXISTS courses (
      id INT AUTO_INCREMENT PRIMARY KEY,
      courseName VARCHAR(100),
      courseCode VARCHAR(50),
      credits INT,
      department VARCHAR(100)
    );
  `;

  await query(createStudentsTableSQL);
  await query(createCredentialsTableSQL);
  await query(createCoursesTableSQL);
};

createTables().catch(err => console.error('Error creating tables:', err));

module.exports = { query, createTables };
