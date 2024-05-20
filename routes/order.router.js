const express = require('express')
const router = express.Router()
const {health,getByOrderId,getOrder,postOrder,patchOrder,deleteOrder}=require('../controllers/order.controller')

router.get('/order/v1/health', health)
router.get('/order/v1/:id', getByOrderId )
router.get('/order/v1', getOrder)
router.post('/order/v1',postOrder)
router.patch('/order/v1/:id',patchOrder)
router.delete('/order/v1/:id',deleteOrder)



module.exports = router;