const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");



const AuthMiddleware = asyncHandler(async (req, res, next) => {
    try {
        let token;
        if(req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(' ')[1];
            const decoder = jwt.verify(token, process.env.JWT_SECRET)
            if(decoder){const user = await UserModel.findById(decoder?.id)
                // res.json(user)
                req.user = user;//req.user is the property and assigning it to the user object
                next()}
                else{res.json('the token is wrong')}
            
        }
        else{
res.json(message= 'given token is wrong')
        }
       
    }
    catch (error) {
        throw new Error(error)
    }
})

const isAdmin = asyncHandler(async function(req,res,next){
const {email} = req.user;
const user = await UserModel.findOne({email:email})
if(user.role !== "admin"){
    throw new Error('you are not an admin')
}
else{
    next()
}

    })



module.exports = {AuthMiddleware, isAdmin}