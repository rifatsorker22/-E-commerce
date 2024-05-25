const express = require('express')

const router = express.Router()

const health = require('../controllers/Health.controller')

router.get('/health/v1', health )

module.exports = router;