const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// DB connection
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/todo', require('./routes/todo.routes'));
app.use('/api/blog', require('./routes/blog.routes'));
app.use('/api/comments', require('./routes/comment.routes'));
app.use('/api/meetings', require('./routes/meeting.routes'));

// Root
app.get('/', (req, res) => {
  res.send('Backend API is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
