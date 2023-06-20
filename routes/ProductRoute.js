const express = require("express");
const { createProduct } = require("../controllers/ProductCtrl");
const router = express.Router();

router.post('/',createProduct)

module.exports = router