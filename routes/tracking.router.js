const express = require('express')
const router = express.Router()
const {
    getById,
    getAll,
    create,
    updateById,
    DeleteById
} = require('../controllers/tracking.controller')



router.get('/tracking/v1/:id', getById)
router.get('/tracking/v1', getAll)
router.post('/tracking/v1', create)
router.patch('/tracking/v1/:id', updateById)
router.delete('/tracking/v1/:id', DeleteById)

module.exports = router