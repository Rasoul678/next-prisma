CREATE TABLE Me (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO Me (name, email) VALUES ('Rasoul Hesami Rostami', 'h.rostami.r@gmail.com');