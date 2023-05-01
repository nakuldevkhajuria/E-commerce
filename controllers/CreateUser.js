const { generateToken } = require("../config/jwtoken.js");
const UserModel = require("../models/UserModel.js")
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbid.js");



const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await UserModel.findOne({ email: email })

    if (!findUser) {
        //create a new user
        const newUser = await UserModel.create(req.body)
        res.send(newUser)
        //and send as json
    }
    else {
        throw new Error('User Already Exists')
    }
})
const loginUser = asyncHandler(
    async (req, res) => {
        const { email, password } = req.body;
        //check if user exisits or not
        const findUser = await UserModel.findOne({ email })

        if (findUser && (await findUser.isPasswordMatched(password))) {
            res.json({
                _id: findUser._id,
                firstname: findUser.firstname,
                lastname: findUser.lastname,
                email: findUser.email,
                mobile: findUser.mobile,
                token: generateToken(findUser._id)
            })
        }
        else {
            throw new Error("Invalid credentials")
        }

    }
)

//get all users
const getAllUsers = asyncHandler(
    async (req, res) => {
        try {
            const allUsers = await UserModel.find();
            console.log(allUsers)
            res.json(
                allUsers
            )
        }
        catch (error) {
            throw new Error(error)
        }
    }
)

//get single user
const getSingleUser = asyncHandler(
    async function (req, res) {
        try {

            const { id } = req.params
            validateMongodbId(id);
          
            const user = await UserModel.findById(id)

            if (user) { res.json(user) }
            else { res.json(message = 'This id is not present in the database') }

        } catch (error) {
            throw new Error(error)
        }
    }
)

const deleteSingleUser = asyncHandler(
    async function (req, res) {
        try {

            const { id } = req.params

            const user = await UserModel.findByIdAndDelete(id)

            if (user) { res.json(user) }
            else { res.json(message = 'This id is not present in the database') }

        } catch (error) {
            throw new Error(error)
        }
    }
)
const updateSingleUser = asyncHandler(
    async function (req, res) {
        try {

            // const {id} = req.params
            const { _id } = req.user
            validateMongodbId(_id);

            const user = await UserModel.findByIdAndUpdate(_id, {
                firstname: req?.body?.firstname,
                lastname: req?.body?.lastname,
                email: req?.body?.email,
                mobile: req?.body?.mobile

            }, { new: true })


            if (user) { res.json(user) }
            else { res.json(message = 'This id is not present in the database') }

        } catch (error) {
            throw new Error(error)
        }
    }
)

const blockUser = asyncHandler(
    async function (req, res) {
        const { id } = req.params;
    
        try {
            validateMongodbId(id);
            const user = await UserModel.findByIdAndUpdate(id, {
                isBlocked: true
            }, { new: true })
            res.json(user)

        }
        catch (error) {
            throw new Error(error)
        }

    }


)
const unblockUser = asyncHandler(
    async function (req, res) {
        const { id } = req.params;
        validateMongodbId(id);
        try {
            const user = await UserModel.findByIdAndUpdate(id, {
                isBlocked: false
            }, { new: true })
            res.json(user)
        }
        catch (error) {

            throw new Error(error)
        }

    }


)

module.exports = { createUser, loginUser, getAllUsers, getSingleUser, deleteSingleUser, updateSingleUser, blockUser, unblockUser }

