const express = require("express");
const dbConnect = require("./config/dbConnect");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;
const mainRoute = require("./routes/MainRoute");
const { notFound, errorHandler } = require("./middlewares/errorHandler");


const app = express();

app.use(express.json())


app.use("/api/user",mainRoute)
app.use(notFound)
app.use(errorHandler)

app.listen(PORT,async()=>{
    await dbConnect();
    console.log(`The Server is running on Port ${PORT}`)
})