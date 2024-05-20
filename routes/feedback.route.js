const express = require('express')
const router = express.Router()
const {health,getByIdFeedback,getFeedback,postFeedback,putFeedback,deleteFeedback}=require('../controllers/feedback.controller')



router.get('/feedback/v1/health', health)
router.get('/feedback/v1/:id', getByIdFeedback)
router.get('/feedback/v1/', getFeedback)
router.post('/feedback/v1/', postFeedback)
router.put('/feedback/v1/:id', putFeedback)
router.delete('/feedback/v1/:id', deleteFeedback)


module.exports =  router;