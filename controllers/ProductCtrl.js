const ProductModel = require("../models/ProductModel")
const asyncHandler = require('express-async-handler')

const createProduct = asyncHandler(async(req,res)=>{

    try {
        const newProduct = await ProductModel.create(req.body)
        res.json({ newProduct})
    } catch (error) {
        throw error
    }
    

    
})

const getAProduct = asyncHandler(async(req,res)=>{
    try {
        const {id} = req.params;
        const getAProduct = await ProductModel.findById(id)
        res.json({getAProduct})
    } 
    catch (error) {
    throw error    
    }
  

})

const getAllProduct = asyncHandler(async(req,res)=>{
    try {

        const getAllProduct = await ProductModel.find()
        res.json({getAllProduct})
    } 
    catch (error) {
    throw error    
    }
  

})

module.exports = {
    createProduct,
    getAProduct,
    getAllProduct,
}