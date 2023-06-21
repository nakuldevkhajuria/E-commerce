const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,

    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"   
    },
    brand:{
        type:String,
        enum:["Apple","Samsung","Google","Lenovo"]
    },
    quantity:{
        type:Number,
        required:true,
    },
    sold:{
            type:Number,
            default:0,
            select:false,
            //select will hide the sold from the user
        }    
    ,
    color:{
        type:String,
        enum:["red","orange","purple"],
    },
    rating:[
        {
            star:Number,
            postedby: {
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            }
        }
    ]
});

//Export the model
module.exports = mongoose.model('Product', productSchema);