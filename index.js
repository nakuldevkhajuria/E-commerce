const express = require("express");
const dbConnect = require("./config/dbConnect");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT;
const mainRoute = require("./routes/MainRoute");
const ProductRoute = require("./routes/ProductRoute")
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const morgan = require("morgan")
const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))

app.use("/api/user",mainRoute)
app.use("/api/product", ProductRoute)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT,async()=>{
    await dbConnect();
    console.log(`The Server is running on Port ${PORT}`)
})