const Meeting = require('../models/meeting.model');
const User = require('../models/user.model');
const nodemailer = require('nodemailer');

// Setup a basic nodemailer transport (customize as needed)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,     // Your Gmail address
    pass: process.env.EMAIL_PASS      // App password (not your actual password)
  }
});

// @desc Schedule a meeting
// @route POST /api/meetings
exports.scheduleMeeting = async (req, res) => {
  try {
    const { title, description, date, participants } = req.body;

    const meeting = await Meeting.create({
      title,
      description,
      date,
      participants,
      createdBy: req.user._id
    });

    // Send email invites
    const users = await User.find({ _id: { $in: participants } });
    for (const user of users) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: `Meeting Invite: ${title}`,
        text: `You have been invited to a meeting: ${title}\n\nDetails: ${description}\nDate: ${date}`
      });
    }

    res.status(201).json(meeting);
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ message: err.message });
  }
};

// @desc Get meetings for the logged-in user
// @route GET /api/meetings
exports.getUserMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find({
      $or: [
        { createdBy: req.user._id },
        { participants: req.user._id }
      ]
    }).populate('participants', 'name email');
    res.json(meetings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Aggregation: Count of meetings per user
// @route GET /api/meetings/summary
exports.getMeetingSummary = async (req, res) => {
  try {
    const summary = await Meeting.aggregate([
      { $unwind: '$participants' },
      {
        $group: {
          _id: '$participants',
          totalMeetings: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'userDetails'
        }
      },
      {
        $unwind: '$userDetails'
      },
      {
        $project: {
          _id: 0,
          user: '$userDetails.name',
          email: '$userDetails.email',
          totalMeetings: 1
        }
      },
      { $sort: { totalMeetings: -1 } }
    ]);

    res.json(summary);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
