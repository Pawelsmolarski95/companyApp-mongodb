const express = require('express');
const ProductControllers = require('./../controllers/products.controller');
const router = express.Router();


router.get('/products', ProductControllers.getAll);

router.get('/products/random', ProductControllers.getRandom);

router.get('/products/:id', ProductControllers.getProById);

router.post('/products', ProductControllers.postPro);

router.put('/products/:id', ProductControllers.editPro);

router.delete('/products/:id', ProductControllers.deletePro);


module.exports = router;
