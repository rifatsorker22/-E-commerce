const express = require('express');
const router = express.Router();
const {
  getProductById,
  getProduct,
  postProduct,
  putProduct,
  deleteProduct
} = require('../controllers/product.controller');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API endpoints for managing products
 */

/**
 * @swagger
 * /products/v1/{id}:
 *   get:
 *     summary: Get a product by ID
 *     description: Retrieve a product from the database by its ID.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to retrieve.
 *     responses:
 *       '200':
 *         description: Successful retrieval of the product.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: '123'
 *                 name:
 *                   type: string
 *                   example: 'Sample Product'
 *                 price:
 *                   type: number
 *                   example: 19.99
 */
router.get('/products/v1/:id', getProductById);

/**
 * @swagger
 * /products/v1:
 *   get:
 *     summary: Get all products
 *     description: Retrieve all products from the database.
 *     tags: [Products]
 *     responses:
 *       '200':
 *         description: Successful retrieval of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: '123'
 *                   name:
 *                     type: string
 *                     example: 'Sample Product'
 *                   price:
 *                     type: number
 *                     example: 19.99
 */
router.get('/products/v1', getProduct);

/**
 * @swagger
 * /products/v1:
 *   post:
 *     summary: Create a new product
 *     description: Add a new product to the database.
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       '201':
 *         description: Product successfully created.
 *       '400':
 *         description: Invalid request body.
 */
router.post('/products/v1', postProduct);

/**
 * @swagger
 * /products/v1/{id}:
 *   put:
 *     summary: Update a product by ID
 *     description: Update an existing product in the database by its ID.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Product successfully updated.
 *       '404':
 *         description: Product not found.
 */
router.put('/products/v1/:id', putProduct);

/**
 * @swagger
 * /products/v1/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     description: Delete a product from the database by its ID.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to delete.
 *     responses:
 *       '204':
 *         description: Product successfully deleted.
 *       '404':
 *         description: Product not found.
 */
router.delete('/products/v1/:id', deleteProduct);

module.exports = router;
