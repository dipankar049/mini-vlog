const Post = require("../models/post");

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("author", "name")
            .sort({ createdAt: -1 });

        res.status(200).json({ data: posts });
    } catch (err) {
        console.error("Get Posts Error:", err);
        res.status(500).json({ msg: "Server error" });
    }
};


const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ msg: "Title and content required" });
        }

        const post = await Post.create({
            title,
            content,
            author: req.userId,
        });

        res.status(201).json({ data: post, msg: "Post created successfully" });
    } catch (err) {
        console.error("Create Post Error:", err);
        res.status(500).json({ msg: "Server error" });
    }
};

const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }

        if (post.author.toString() !== req.userId) {
            return res.status(403).json({ msg: "Not allowed" });
        }

        await post.deleteOne();

        res.status(200).json({ msg: "Post deleted" });
    } catch (err) {
        console.error("Delete Post Error:", err);
        res.status(500).json({ msg: "Server error" });
    }
};

module.exports = {
    getPosts,
    createPost,
    deletePost
};