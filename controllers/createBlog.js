const blog = require("../models/blog");
const like = require("../models/like");
const comment = require("../models/comment");

exports.createBlog = async(req, res) => {
    try{
        const {title, description} = req.query;
        const response = await blog.create({title, description});
        res.status(200).json({
            success:true, 
            data: response,
            message: 'Entry created successfully.',
        });
    }catch(err){
        res.status(500).json({
            success: false,
            data: "internal server error",
            message:err.message,
        });
    }
}
exports.deleteBlog = async(req, res) => {
    try{
        // console.log(req.params);
        const {id} = req.params;
        const curr = await blog.findByIdAndDelete(id);
        if(!curr){
            res.status(404).json({
                success: false,
                data: "Blog not found",
                message: "Blog with ID " + id + " not found",
            });
        }else{
            // await like.updateMany({ _id: { $in: blog.likes } }, { $pull: { blog: blog._id } });
            // await comment.updateMany({ _id: { $in: blog.comments } }, { $pull: { blog: blog._id } });
            await like.deleteMany({ blog: blog._id });
            await comment.deleteMany({ blog: blog._id });
            res.status(200).json({
              success: true,
              data: "Deleted blog and related likes and comments respectively.",
            });
        }
    }catch(err){
        res.status(500).json({
            success: false,
            data: "internal server error",
            message:err.message,
        });
    }
}