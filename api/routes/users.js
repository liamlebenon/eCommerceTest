const express = require('express');
const router = express.Router();
const { pool, query } = require('../../db');

// router.post('/signup', (req, res, next) => {
//     if(!req.body.username || !req.body.password) {
//         res.status(404).json({
//             errorMessage: 'Please enter valid data for username and password!'
//         });
//     } else {
//         //Encrypts the users password using the hash
//         bcrypt.hash(req.body.password, 10, (err, hash) => {
//                 if(err) {
//                     return res.status(500).json({
//                         error: err
//                     });
//                 } else {
//                     //If no error occurs, assign user details to a new User object
//                     const user = new User({
//                         username: req.body.username,
//                         password: hash
//                     });
//                     res.send(user);
//                 }
//             })
       
//     }
// });

router.get('/', (req, res) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if(error) {
            res.send(error.message);
        }
        res.status(200).json(results.rows);
        console.log('Users sent!');
    });
});

router.get('/dashboard', (req, res) => {
    res.send('works!')
});

router.get('/:userId', (req, res) => {
    const userId = req.params.userId;
    pool.query('SELECT * FROM users WHERE id = $1',
        [userId],
        (error, results) => {
            if(error) {
                res.send(error.message);
            }
            res.status(200).json(results.rows)
        })
});




router.post('/', (req, res) => {
    const { name, surname, username, password, email } = req.body;
    pool.query('INSERT INTO users (name, surname, username, password, email) VALUES ($1, $2, $3, $4, $5)', 
            [ name, surname, username, password, email ], 
            (error, results) => {
        if(error) {
            res.send(error.message);
        }
        res.status(201).send(`User ${name} ${surname} has been added to the Database!`);
        console.log(`User ${name} ${surname} has been added to the Database!`)
    })
});

router.delete('/:userId', (req, res) => {
    const userId = req.params.userId;
    pool.query('DELETE FROM users WHERE id = $1', 
            [userId], 
            (error, results) => {
        if(error) {
            res.send(error.message);
        }
        res.status(204).json(results.rows);
        console.log('User successfully deleted!');
    });
});

module.exports = router;
