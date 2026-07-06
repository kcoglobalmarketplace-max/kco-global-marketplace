const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Define the search route
// This endpoint accepts JSON requests from Web, Android, and iOS
router.post('/search', productController.searchProducts);

module.exports = router;