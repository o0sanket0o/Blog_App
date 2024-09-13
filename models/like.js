const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
        blog:{
            type : mongoose.Schema.Types.ObjectId,
            ref : "blog",
        },
        user:{
            type : String, 
            required : true,
        },
});


module.exports = mongoose.model("like", likeSchema);