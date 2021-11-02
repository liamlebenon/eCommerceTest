const express = require('express');
const router = express.Router();
const { pool, query } = require('../../db');
const path = require('path');

router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname+ '/index.html'));
});

router.post('/', (req, res, next) => {
    const { name, surname, username, password, email } = req.body;
    pool.query('INSERT INTO users (name, surname, username, password, email) VALUES ($1, $2, $3, $4, $5)',
        [ name, surname, username, password, email ],
        (error, results) => {
            if(error) {
                res.send(error.message)
            }
            res.status(201).send(`User ${username} was created!`)
        });
});

module.exports = router;