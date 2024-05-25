const express = require('express')
const router = express.Router()
const {getByOrderId,getOrder,postOrder,patchOrder,deleteOrder}=require('../controllers/order.controller')

router.get('/orders/v1/:id', getByOrderId )
router.get('/orders/v1', getOrder)
router.post('/orders/v1',postOrder)
router.patch('/orders/v1/:id',patchOrder)
router.delete('/orders/v1/:id',deleteOrder)



module.exports = router;