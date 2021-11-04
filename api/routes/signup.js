const express = require('express');
const router = express.Router();
const { pool, query } = require('../../db');
const path = require('path');
const bcrypt = require('bcrypt');

router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname+ '/index.html'));
});

router.post('/', async (req, res, next) => {
    const { name, surname, username, password, email, confirmPassword} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    if (password !== confirmPassword) {
        res.write('<h3>Passwords do not match!</h3><br/><br/><form action="signup"><input type="submit" value="Go Back to Signup"/></form>');
        res.end();
    } else {
      pool.query('INSERT INTO users (name, surname, username, password, email) VALUES ($1, $2, $3, $4, $5)',
        [ name, surname, username, hashedPassword, email ],
        (error, results) => {
            if(error) {
                res.send(error.message);
            } else {
                res.status(201).redirect('/login');
                console.log(`User ${username} was created`)
                res.end();
            };
        });  
    };
    
});

module.exports = router;