const express = require("express");
const { createProduct, getAllProduct, getAProduct, updateAProduct, updateProduct, deleteProduct } = require("../controllers/ProductCtrl");
const router = express.Router();
const { isAdmin , AuthMiddleware } = require("../middlewares/AuthMiddleware")





router.post("/", AuthMiddleware,isAdmin,createProduct)
router.get("/:id",getAProduct)
router.put("/:id",  AuthMiddleware, isAdmin,updateProduct)
router.get("/",getAllProduct)
router.delete("/:id", AuthMiddleware, isAdmin , deleteProduct)







module.exports = router