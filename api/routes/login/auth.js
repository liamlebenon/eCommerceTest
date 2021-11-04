//import necessary requirements for accessing DB
const express = require('express');
const { request } = require('../../../app');
const { pool, query } = require('../../../db');
const router = express.Router();


let username;
let password;

router.get('/', (req, res) => {
    res.send(username === undefined ? 'You must enter a username and password!' : `You are logged in as ${username}!`);
});

//Takes the user input data from /login and uses it to select  the right user from the DB by matching the username and password
router.post('/', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
        pool.query('SELECT * FROM users WHERE username = $1 AND password = $2',
            [username, password],
            (error, results, fields) => {
                if(error) {
                    res.send(error.message);
                }
                if (results) {
                    console.log(`User logged in as ${username}`);
                    res.redirect(`/users/${username}`);                    
                } else {
                    res.send('Incorrect username and/or password');

                };
            });
    } else {
        res.send('You must enter a username and password!');
    }
});

module.exports = router;