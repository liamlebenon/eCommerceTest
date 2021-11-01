const express = require('express');
const path = require('path');
const { pool, query } = require('../../../db');
const router = express.Router();

//Sends the user the login page where their details will be sent to /auth
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/login.html'));
});

module.exports = router;
