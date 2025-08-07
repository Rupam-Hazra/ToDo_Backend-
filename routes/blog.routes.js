const express = require('express');
const router = express.Router();
const protect = require('../middlewares/auth.middleware');
const {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
  getTopPosts
} = require('../controllers/blog.controller');

router.use(protect);

router.post('/', createPost);
router.get('/', getAllPosts);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

// Aggregation
router.get('/top-liked', getTopPosts);

module.exports = router;
