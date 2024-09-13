const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.PORT || 4000;

//Use middleware
app.use(express.json());

const blogRoutes = require('./routes/blog');


app.use("/blog/v1", blogRoutes);

app.listen(port, () => {
    console.log("Server started successfully.");
})

const dbConnect = require("./config/database");
dbConnect();


app.get("/", (req, res) =>{
    res.send("Hello from blog application home page.");
})