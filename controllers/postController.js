const Post = require('../models/postModel');

exports.getALlPosts = async (req, res, next) => {
    try {
        const posts = await Post.find();
        res.json({
            status: 'success',
            length: posts.length,
            payload: {
                posts,
            },
        });
    } catch (e) {
        res.json({
            status: 'fail',
            message: e.message,
        });
    }
};

exports.getOnePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        res.json({
            status: 'success',
            payload: {
                post,
            },
        });
    } catch (e) {
        res.json({
            status: 'fail',
            message: e.message,
        });
    }
};

exports.createPost = async (req, res, next) => {
    try {
        const post = await Post.create(req.body);
        res.json({
            status: 'success',
            payload: {
                post,
            },
        });
    } catch (e) {
        res.json({
            status: 'fail',
            message: e.message,
        });
    }
};

exports.updatePost = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.json({
            status: 'success',
            payload: {
                post,
            },
        });
    } catch (e) {
        res.json({
            status: 'fail',
            message: e.message,
        });
    }
};


exports.deletePost = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        res.json({
            status: 'success',
        });
    } catch (e) {
        res.json({
            status: 'fail',
            message: e.message,
        });
    }
};
