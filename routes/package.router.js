const express = require('express')
const router = express.Router()
const {
    getById,
    getAll,
    create,
    updateById,
    deletetById
} = require('../controllers/package.controller')


router.get('/package/v1/:id', getById)
router.get('/package/v1', getAll)
router.post('/package/v1', create)
router.put('/package/v1/:id', updateById)
router.delete('/package/v1/:id', deletetById)

module.exports = router