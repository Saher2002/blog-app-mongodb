const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const articleRoutes = require("./Routes/articleRoutes");
app.use("/api/articles",articleRoutes);

//connect mongoDB and start server!!
mongoose.connect(process.env.MONGO_URI)
 .then(()=>{
    console.log("MongoDB connected");
    app.listen(process.env.PORT,()=>
        console.log(`server running at http://localhost:${process.env.PORT}`)
    );
 })
 .catch((err) => console.error("MongoDB connection error: ",err));
 