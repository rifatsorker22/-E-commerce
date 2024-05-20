const express = require('express')
const router = express.Router()
const {getCart,postCart,deleteCart,deleteCartItem}=require('../controllers/cart.controller')

router.get('/cart/v1/:userId', getCart)
router.post('/cart/v1', postCart)
router.delete('/cart/v1/:userId', deleteCart)
router.delete('/cart/v1/:cartId/:itemId', deleteCartItem)


module.exports = router;