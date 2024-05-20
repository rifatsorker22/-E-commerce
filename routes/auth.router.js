const express = require('express')
const router = express.Router()
const {register,login,logout} = require('../controllers/auth.controller')



router.post('/api/register/v1',register)
router.post('/api/login/v1',login)
router.post('/api/logout/v1',logout)



module.exports = router ;