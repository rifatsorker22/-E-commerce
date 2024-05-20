const express = require('express')
const router = express.Router()
const {
      getProductById,
      getProduct,
      postProduct,
      putProduct,
      deleteProduct
      
}=require('../controllers/product.controller')


router.get('/products/v1/:id', getProductById)
router.get('/products/v1', getProduct )
router.post('/products/v1', postProduct )
router.put('/products/v1/:id', putProduct )
router.delete('/products/v1/:id', deleteProduct)

module.exports = router ;