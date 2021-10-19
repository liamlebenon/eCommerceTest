const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');

router.post('/signup', (req, res, next) => {
    if(!req.body.username || !req.body.password) {
        res.status(404).json({
            errorMessage: 'Please enter valid data for username and password!'
        });
    } else {
        //Encrypts the users password using the hash
        bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    //If no error occurs, assign user details to a new User object
                    const user = new User({
                        username: req.body.username,
                        password: hash
                    });
                    res.send(user);
                }
            })
       
    }
});

module.exports = router;
