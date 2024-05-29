const express = require('express')

const router = express.Router()

const {
    getAll,
    create,
    updateById,
    deleteByID
} = require('../controllers/address.controller')




router.get('/address/v1', getAll)
router.post('/address/v1', create)
router.put('/address/v1/:id', updateById)
router.delete('/address/v1/:id', deleteByID)


module.exports = router