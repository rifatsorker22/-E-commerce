const express = require('express')

const router = express.Router()

const {
getById,
getAll,
create,
updateById,
deleteById
} = require('../controllers/recommendation.controller')

router.get('/recommendation/v1/:id', getById)
router.get('/recommendation/v1', getAll)
router.post('/recommendation/v1', create)
router.patch('/recommendation/v1/:id', updateById)
router.delete('/recommendation/v1/:id', deleteById)

module.exports = router