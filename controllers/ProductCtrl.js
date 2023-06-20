const ProductModel = require("../models/ProductModel")
const asyncHandler = require('express-async-handler')

const createProduct = asyncHandler(async()=>{
    res.json({ message:'this is the createProduct'})
})

module.exports = {
    createProduct
}