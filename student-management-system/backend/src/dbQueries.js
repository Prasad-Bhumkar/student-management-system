const createCredentialsTableSQL = `
  CREATE TABLE IF NOT EXISTS credentials (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Auto-incrementing ID for each record
    email VARCHAR(255) NOT NULL UNIQUE, -- User's email, must be unique
    password VARCHAR(255) NOT NULL, -- User's hashed password
    remember_me BOOLEAN DEFAULT FALSE, -- Whether the user opted for "remember me"
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp for when the record was created
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Timestamp for when the record was last updated
  );
`;

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

module.exports = {
  createCredentialsTableSQL,
  createStudentsTableSQL,
  // Add other queries here as needed
};
