const blog = require("../models/blog");
const Like = require("../models/like");

exports.addLike = async(req, res) => {
    try{
        const {blogId, user} = req.query;
        const create = new Like({
            blogId, user
        });
        const newLike = await create.save();
        const updatedBlog = await blog.findByIdAndUpdate(blogId, {$push : {likes : newLike._id} }, {new:true})
        .populate("likes").exec();
        // console.log(updatedBlog);
        // const post = await blog.findById(blogId).exec();
        // console.log(post.title);
        // console.log(post.description);
        res.status(200).json({
            success:true, 
            data: updatedBlog,
            message: 'Liked post Successfully',
        });
    }catch(err){
        res.status(500).json({
            success: false,
            data: "internal server error",
            message: err.message,
        });
    }
};

exports.unLike = async(req, res) => {
    try{
        const {blogId, likeId} = req.query;
        console.log(blogId);
        console.log(likeId);
        const findLike = await Like.findOneAndDelete({_id : likeId}, {blogId : blogId});
        const updatedBlog = await blog.findByIdAndUpdate(blogId, {$pull : {likes : findLike._id} }, {new:true})
        .populate("likes").exec();
        res.status(200).json({
            success:true, 
            data: updatedBlog,
            message: 'Unliked post Successfully',
        });
    }catch(err){
        res.status(500).json({
            success: false,
            data: "internal server error",
            message: err.message,
        });
    }
};