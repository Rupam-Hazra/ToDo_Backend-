const express = require('express');
const router = express.Router();
const protect = require('../middlewares/auth.middleware');
const {
  createTask,
  getUserTasks,
  updateTask,
  deleteTask,
  getAverageRating
} = require('../controllers/todo.controller');

router.use(protect);

router.post('/', createTask);
router.get('/', getUserTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

// Aggregation
router.get('/average-rating', getAverageRating);

module.exports = router;
