const express = require("express");
const router = express.Router();


const { addLike, unLike } = require("../controllers/like");
const { createBlog, deleteBlog } = require("../controllers/createBlog");
const { addComment, deleteComment } = require("../controllers/comment");


router.post("/createBlog", createBlog);
router.post("/like", addLike);
router.post("/Comment", addComment);
router.post("/unLike", unLike);
router.post("/deleteComment", deleteComment);
router.delete("/deleteBlog/:id", deleteBlog);


module.exports = router;