const Post = require('../models/post.model');

// @desc Create a blog post
// @route POST /api/blog
exports.createPost = async (req, res) => {
  try {
    const post = await Post.create({
      user: req.user._id,
      title: req.body.title,
      content: req.body.content
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc Get all blog posts
// @route GET /api/blog
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'name');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Update post
// @route PUT /api/blog/:id
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc Delete post
// @route DELETE /api/blog/:id
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Aggregation: Top 5 posts by comment count
// @route GET /api/blog/top
exports.getTopPosts = async (req, res) => {
  try {
    const result = await Post.aggregate([
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "post",
          as: "comments"
        }
      },
      {
        $addFields: {
          commentCount: { $size: "$comments" }
        }
      },
      { $sort: { commentCount: -1 } },
      { $limit: 5 }
    ]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
