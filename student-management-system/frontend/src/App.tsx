CREATE TABLE credentials (
    id SERIAL PRIMARY KEY,               -- Unique identifier for each record
    email VARCHAR(255) UNIQUE NOT NULL,  -- User's email, must be unique
    password VARCHAR(255) NOT NULL,      -- Hashed password
    remember_me BOOLEAN DEFAULT FALSE,    -- Flag for "remember me" functionality
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp for record creation
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Timestamp for record updates
);