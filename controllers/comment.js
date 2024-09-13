const blog = require("../models/blog");
const Comment = require("../models/comment");

exports.addComment = async(req, res) => {
    try{
        const {blogId, user, body} = req.query;
        // console.log(blogId);
        // console.log(user);
        // console.log(body);
        const create = new Comment({
            blogId, user, body
        });
        const newComment = await create.save();
        const updatedBlog = await blog.findByIdAndUpdate(blogId, {$push : {comments : newComment._id} }, {new:true})
        .populate("comments").exec();
        // console.log(updatedBlog);
        // const post = await blog.findById(blogId).exec();
        // console.log(post.title);
        // console.log(post.description);
        res.status(200).json({
            success:true, 
            data: updatedBlog,
            message: 'Commented Successfully',
        });
    }catch(err){
        res.status(500).json({
            success: false,
            data: "internal server error",
            message: err.message,
        });
    }
};


exports.deleteComment = async(req, res) => {
    try{
        const {blogId, commentId} = req.query;
        const newComment = await Comment.findOneAndDelete({_id : commentId}, {blog : blogId});
        const updatedBlog = await blog.findByIdAndUpdate(blogId, {$pull : {comments : newComment._id} }, {new:true})
        .populate("comments").exec();
        // console.log(updatedBlog);
        // const post = await blog.findById(blogId).exec();
        // console.log(post.title);
        // console.log(post.description);
        res.status(200).json({
            success:true, 
            data: updatedBlog,
            message: 'Commented Successfully',
        });
    }catch(err){
        res.status(500).json({
            success: false,
            data: "internal server error",
            message: err.message,
        });
    }
};
