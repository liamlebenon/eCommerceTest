const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /products'
    });
});

router.post('/', (req, res, next) => {
    //Body parser gives access to the body parameter
    const product = {
        name: req.body.name,
        price: req.body.price
    }
    //Handle error if name or price is left blank
    if(!product.name || !product.price) {
        res.status(404).json({
            message: 'Invalid data submitted'
        })
    } else {
        res.status(201).json({
            message: 'Handling POST requests to /products',
            //Verifies that the product was created
            createdProduct: product
        });
    }
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    if (id === 'special') {
        res.status(200).json({
            message: 'You discovered the special ID',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'You passed an ID',
            id: id
        })
    }
});

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated product!'
    });
});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    res.status(200).json({
        message: `Deleted product (id: ${id})`
    })
});

module.exports = router;