const express = require('express')
const router = express.Router()
const {health,getById,getAllrefundReason,postRefundReason,putRefundReason,deleteRefundReason}=require('../controllers/refundReason.controller')


router.get('/refund/reason/v1/health', health)
router.get('/refund/reason/v1/:id', getById)
router.get('/refund/reason/v1/', getAllrefundReason)
router.post('/refund/reason/v1/', postRefundReason)
router.put('/refund/reason/v1/:id', putRefundReason)
router.delete('/refund/reason/v1/:id', deleteRefundReason)


module.exports = router ;