const express = require('express')
const router = express.Router()
const {
    getAllRefund,
    getRefundByStatus,
    postRefund,
    updateRefund,
    deleteRefund

}=require('../controllers/refund.controller')


router.get('/refund/v1/:status', getRefundByStatus)
router.get('/refund/v1', getAllRefund)
router.post('/refund/v1/', postRefund)
router.put('/refund/v1/:id', updateRefund)
router.delete('refund/v1:id', deleteRefund)

module.exports = router ;