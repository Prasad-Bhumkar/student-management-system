CREATE TABLE credentials (
    id SERIAL PRIMARY KEY, -- Auto-incrementing ID for each credential
    email VARCHAR(255) NOT NULL UNIQUE, -- User's email, must be unique
    password VARCHAR(255) NOT NULL, -- Hashed password
    remember_me BOOLEAN DEFAULT FALSE, -- Boolean for remember me option
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp for when the record was created
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Timestamp for when the record was last updated
);