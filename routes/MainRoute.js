const express = require("express");
const { createUser, loginUser, getAllUsers, getSingleUser, deleteSingleUser, updateSingleUser, blockUser, unblockUser } = require("../controllers/CreateUser");
const {AuthMiddleware, isAdmin} = require("../middlewares/AuthMiddleware");
const router = express.Router();


router.post("/register", createUser);
router.post("/login", loginUser);
router.get('/getallusers', getAllUsers)

router.get("/:id", AuthMiddleware,isAdmin, getSingleUser)

router.delete("/delete/:id", deleteSingleUser)
router.put("/edit-user",AuthMiddleware, updateSingleUser)




router.put("/block/:id" ,AuthMiddleware,isAdmin, blockUser)
router.put("/unblock/:id",AuthMiddleware,isAdmin, unblockUser)

//this routes means
//1. only admin can block or unblock any user
//2. a role with "user" will not be allowed .
//3. AuthMiddleware verify the token, and isAdmin will check if its a admin only. then only



module.exports = router;