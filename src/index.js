//require("dotenv").config({path:"./env"});  -> but it disturbs the consistency of the code
import {} from "dotenv/config"; // Automatically loads environment variables from .env file
import dotenv from "dotenv";

dotenv.config({
    path:"./env"
})

import  connectDB  from "./db/index.js";
connectDB();

/*
import express from "express";
const app= express();

(async()=>{
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("Error in server:", error);
            throw error;
        })
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
})()
*/