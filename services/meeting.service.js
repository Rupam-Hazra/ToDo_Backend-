const Meeting = require('../models/meeting.model');

exports.getMeetingsCountPerUser = async () => {
  const result = await Meeting.aggregate([
    { $unwind: "$participants" },
    { $group: { _id: "$participants", meetingCount: { $sum: 1 } } },
  ]);

  return result;
};
