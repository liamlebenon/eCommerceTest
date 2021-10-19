//Allows us to set configuration for where we want to connect DB
const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: 'postgres',
    database: 'products_database',
    host: 'localhost',
    port: 5432
});

module.exports = pool;