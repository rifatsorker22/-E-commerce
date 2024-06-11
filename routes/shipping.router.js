const express = require('express')
const router = express.Router()
const {
    getById,
    getAll,
    create,
    updateById,
    deleteById
} = require('../controllers/shipping.controller')


router.get('/shipping/v1/:id', getById)
router.get('/shipping/v1/', getAll)
router.post('/shipping/v1/', create)
router.put('/shipping/v1/:id', updateById)
router.delete('/shipping/v1/:id', deleteById)

module.exports = router;