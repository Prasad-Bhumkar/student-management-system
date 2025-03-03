CREATE TABLE credentials (
    id SERIAL PRIMARY KEY,          -- Unique identifier for each credential
    email VARCHAR(255) NOT NULL UNIQUE,  -- User's email address
    password VARCHAR(255) NOT NULL,      -- Hashed password
    remember_me BOOLEAN DEFAULT FALSE,    -- Flag for "remember me" functionality
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Timestamp for when the record was created
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  -- Timestamp for when the record was last updated
);