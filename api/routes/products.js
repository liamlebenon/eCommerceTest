const express = require('express');
const { pool, query } = require('../../db');
const router = express.Router();

router.get('/', (req, res) => {
    pool.query('SELECT * FROM products ORDER BY id ASC', (error, results) => {
        if(error) {
            res.send(error.message);
        }
        res.status(200).json(results.rows);
    })
});

router.post('/', (req, res) => {
    const { name, description, seller, quantity, price } = req.body;
    pool.query('INSERT INTO products (name, description, seller, quantity, price) VALUES ($1, $2, $3, $4, $5)', 
            [ name, description, seller, quantity, price ], 
            (error, results) => {
        if(error) {
            res.send(error.message);
        }
        res.status(201).json(results.rows);
    })
})


//Get a specific product by ID
router.get('/:productId', (req, res) => {
    const productId = parseInt(req.params.productId);
    pool.query('SELECT * FROM products WHERE id = $1', 
            [productId], 
            (error, results) => {
        if(error) {
            res.send(error.message);
        }
        res.status(200).json(results.rows);
    });
});


router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated product!'
    });
});

router.delete('/:productId', (req, res) => {
    const productId = req.params.productId;
    pool.query('DELETE FROM products WHERE id = $1', 
            [productId], 
            (error, results) => {
        if(error) {
            res.send(error.message);
        }
        res.status(204).json(results.rows);
        console.log('Product successfully deleted!');
    });
});

module.exports = router;