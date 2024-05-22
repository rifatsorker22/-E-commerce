const express = require('express')
const router = express.Router()
const {
getById,
getAll,
create,
updateById,
deleteById
}=require('../controllers/user.controller')



router.get('/users/v1/:id', getById)
router.get('/users/v1', getAll)
router.post('/users/v1', create)
router.put('/users/v1/:id', updateById)
router.delete('/users/v1/:id', deleteById)



module.exports = router