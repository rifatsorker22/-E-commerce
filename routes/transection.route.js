const express = require('express')
const router = express.Router()
const {getById,getTransection,postTransection,putTransection,deleteTransection}=require('../controllers/transection.controller')


router.get('/transection/v1/:id', getById)
router.get('/transection/v1', getTransection)
router.post('/transection/v1', postTransection)
router.put('/transection/v1/:id', putTransection) 
router.delete('/transection/v1/:id', deleteTransection)


module.exports = router ;