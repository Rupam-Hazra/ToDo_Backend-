const express = require('express');
const router = express.Router();
const protect = require('../middlewares/auth.middleware');
const {
  scheduleMeeting,
  getUserMeetings,
  getMeetingSummary
} = require('../controllers/meeting.controller');

router.use(protect);

router.post('/', scheduleMeeting);
router.get('/', getUserMeetings);

// Aggregation
router.get('/summary', getMeetingSummary);

module.exports = router;
