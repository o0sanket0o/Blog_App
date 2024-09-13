const mongoose = require("mongoose");


const commentSchema = new mongoose.Schema({
        blog:{
            type : mongoose.Schema.Types.ObjectId,
            ref : "blog",
        },
        user:{
            type : String, 
            required : true,
        },
        body:{
            type: String,
            required: true,
        },
});


module.exports = mongoose.model("comment", commentSchema);