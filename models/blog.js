const mongoose = require("mongoose");
const { types } = require("util");

const blogSchema = new mongoose.Schema(
    {
        title:{
            type:String, 
            required: true, 
        },
        description:{
            type:String, 
            required: true,
        },
        likes: [{
            type : mongoose.Schema.Types.ObjectId,
            ref : "like",
        }],
        comments: [{
            type : mongoose.Schema.Types.ObjectId,
            ref : "comment",
        }],
        createdAt:{
            type:Date, 
            required: true,
            default: Date.now(),
        },
        updatedAt:{
            type:Date, 
            required: true, 
            default: Date.now(),
        },
    }
)

module.exports = mongoose.model("blog", blogSchema);