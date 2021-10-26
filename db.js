//Allows us to set configuration for where we want to connect DB
const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'me',
    password: 'lillylab',
    database: 'test2',
    host: 'localhost',
    port: 5432
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    pool
}