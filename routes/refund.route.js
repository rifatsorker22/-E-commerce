const express = require('express')
const router = express.Router()
const {health,getAllRefund,getRefundByStatus,postRefund,updateRefund}=require('../controllers/refund.controller')

router.get('/refund/v1/health', health)
router.get('/refund/v1/:status', getRefundByStatus)
router.get('/refund/v1', getAllRefund)
router.post('/refund/v1/', postRefund)
router.put('/refund/v1/:status', updateRefund)


module.exports = router ;