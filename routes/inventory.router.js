const express = require('express')
const router = express.Router()
const {
getById,
getAll,
create,
updateById,
deleteById
}= require('../controllers/inventory.controller')

router.get('/inventory/v1/:id', getById)
router.get('/inventory/v1', getAll)
router.post('/inventory/v1', create)
router.put('/inventory/v1/:id', updateById)
router.delete('/inventory/v1/:id', deleteById)

module.exports = router ; 