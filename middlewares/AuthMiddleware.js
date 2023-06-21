const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");



const AuthMiddleware = asyncHandler(async (req, res, next) => {
    try {
        let token;
        //token is given manually, and assigned to the variable token
        if (req?.headers?.authorization?.startsWith("Bearer")) {
            token = req.headers.authorization.split(' ')[1];
            const decoder = jwt.verify(token, process.env.JWT_SECRET)
            //till here we are getting the id of the user, as decoder.   console.log(decoder)
         
            if (decoder) {
                const user = await UserModel.findById(decoder?.id)

                req.userData = user;
                //req.userData is the property and assigning  the user object values to it
                //where userData will be the variable holding the value
                //and using it in updating

                next()
            }
            else { res.json('the token is wrong') }

        }
        else {
            res.json(message = 'given token is wrong')
        }

    }
    catch (error) {
        throw new Error(error)
    }
})

const isAdmin = asyncHandler(async function (req, res, next) {
    const { email } = req.userData;

    //req.userData is the user data coming from the AuthMiddleware
    const user = await UserModel.findOne({ email: email })
    if (user.role !== "admin") {
        throw new Error('you are not an admin')
    }
    else {
        next()
    }

})



module.exports = { AuthMiddleware, isAdmin }