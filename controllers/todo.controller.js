const Task = require('../models/task.model');

// @route POST /api/todo
// @desc Create a new task
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      user: req.user._id,
      title: req.body.title,
      description: req.body.description,
      rating: req.body.rating || 0
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @route GET /api/todo
// @desc Get all tasks of logged-in user
exports.getUserTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route PUT /api/todo/:id
// @desc Update a task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @route DELETE /api/todo/:id
// @desc Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route GET /api/todo/average-rating
// @desc Get average task rating using MongoDB aggregation
exports.getAverageRating = async (req, res) => {
  try {
    const result = await Task.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" }
        }
      }
    ]);

    const average = result[0]?.averageRating || 0;
    res.json({ averageRating: average });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
