const transporter = require('../config/mail');

exports.sendMeetingInvite = async ({ to, subject, text }) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text
  };

  await transporter.sendMail(mailOptions);
};
