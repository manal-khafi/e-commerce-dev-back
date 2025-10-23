const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authJwt} = require('../middleware');

router.post('/', authJwt.verifyToken ,orderController.createOrder);

router.get('/', authJwt.verifyToken ,orderController.getAllOrders);

router.get('/:id', authJwt.verifyToken ,orderController.getOrderById);

router.put('/:id', authJwt.verifyToken ,orderController.updateOrder);

router.delete('/:id', authJwt.verifyToken ,orderController.deleteOrder);

module.exports = router;
