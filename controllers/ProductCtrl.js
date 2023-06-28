const ProductModel = require("../models/ProductModel")
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')




const createProduct = asyncHandler(async(req,res)=>{

    try {
        if(req.body.title){
            req.body.slug = slugify(req.body.title)
        }
        const newProduct = await ProductModel.create(req.body)
        res.json({ newProduct})
    } catch (error) {
        throw error
    }
    

    
})

const updateProduct = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    try {
        if(req.body.title){
            req.body.slug = slugify(req.body.title)
        }
        const updateProduct = await ProductModel.findByIdAndUpdate(id,req.body,{new:true})
      
        res.json(updateProduct)
    } 
    catch (error) {
    throw new Error(error);    
    }
})

const deleteProduct = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    try {

        const deleteProduct = await ProductModel.findByIdAndRemove(id)
      
        res.json(deleteProduct)
    } 
    catch (error) {
    throw new Error(error);    
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
    // console.log(req.query)
    try {
        const queryObject = {...req.query}
        console.log(queryObject)
        const getAllProduct = await ProductModel.where("color").equals(
            req.query.color
        )
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
    updateProduct,
    deleteProduct
}