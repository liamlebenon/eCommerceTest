//import necessary requirements for accessing DB
const express = require('express');
const app = require('../../../app');
const { request } = require('../../../app');
const { pool, query } = require('../../../db');
const router = express.Router();
const passport = require('passport');



router.get('/', (req, res) => {
    res.send(username === undefined ? 'You must enter a username and password!' : `You are logged in as ${username}!`);
});

//Takes the user input data from /login and uses it to select  the right user from the DB by matching the username and password
router.post('/', passport.authenticate('local', {
    successRedirect: `/users/dashboard`,
    failureRedirect: '/login',
    failureFlash: true
}));

module.exports = router;