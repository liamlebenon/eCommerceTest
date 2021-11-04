const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    const username = req.query.user;
    if(username !== undefined) {
        res.send(`Welcome to the Home Page, ${username}!`);
    } else {
        res.send('Welcome to the Home Page!');
    }
    console.log(username);
});

module.exports = router;