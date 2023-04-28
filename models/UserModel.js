const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require("bcrypt")
// Declare the Schema of the Mongo model



var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
     
    },
    lastname:{
        type:String,
        required:true
     
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isBlocked:{
        type:Boolean,
        default:false,
    },
    role : {
        type:String,
        default:'user'
    },
    cart : {
        type:Array,
        default : []
    }    
    ,
    address:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Address'
    }]
    ,
    wishlist: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Products'
        }
    ]
   
}
,
{timestamps: true}
);

userSchema.pre("save",async function (next){
    const salt = 10;
    this.password = await bcrypt.hash(this.password,salt);
    next()
})

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword,this.password )
}

//Export the model
module.exports = mongoose.model('User', userSchema);