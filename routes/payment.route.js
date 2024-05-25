const express = require('express')
const router = express.Router()
const {getById,getPayment,postPayment,putPayment,deletePayment}=require('../controllers/pSource.controller')



router.get('/payment/v1/:id', getById)
router.get('/payment/v1', getPayment)
router.post('/payment/v1', postPayment)
router.put('/payment/v1/:id', putPayment)
router.delete('/payment/v1/:id', deletePayment)

module.exports = router;