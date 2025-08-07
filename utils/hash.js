const bcrypt = require('bcryptjs');

// Hash plain text password
exports.hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// Compare plain and hashed password
exports.comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

