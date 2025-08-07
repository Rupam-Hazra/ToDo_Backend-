const Comment = require('../models/comment.model');

// @desc Create comment on a post
// @route POST /api/comments/:postId
exports.addComment = async (req, res) => {
  try {
    const comment = await Comment.create({
      user: req.user._id,
      post: req.params.postId,
      text: req.body.text
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc Get comments for a post
// @route GET /api/comments/:postId
exports.getCommentsForPost = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).populate('user', 'name');
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
