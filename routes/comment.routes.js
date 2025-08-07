const express = require('express');
const router = express.Router();
const protect = require('../middlewares/auth.middleware');
const {
  addComment,
  getCommentsForPost
} = require('../controllers/comment.controller');

router.use(protect);

router.post('/:postId', addComment);
router.get('/:postId', getCommentsForPost);

module.exports = router;
