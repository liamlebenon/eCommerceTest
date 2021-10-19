CREATE DATABASE products_database;

CREATE TABLE products(
    product_id SERIAL PRIMARY KEY,
    name varchar(50),
    seller varchar(50),
    description varchar(255),
    quantity_available integer
);