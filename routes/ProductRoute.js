const express = require("express");
const { createProduct, getAllProduct, getAProduct } = require("../controllers/ProductCtrl");
const router = express.Router();

router.post('/',createProduct)
router.get('/:id',getAProduct)
router.get("/",getAllProduct)

module.exports = router