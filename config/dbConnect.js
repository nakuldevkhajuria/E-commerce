const { default: mongoose } = require("mongoose")


const dbConnect = async()=>{
   try {
    const conn =  await mongoose.connect(process.env.MONGODB_CONNECT)
    console.log('database is connected Successfully')
   } 
   catch (error) {

  
    console.log(`data base error is ${error}`)
   }
}
module.exports= dbConnect;