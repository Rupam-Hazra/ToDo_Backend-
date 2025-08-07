const User = require('../models/user.model');
const { hashPassword, comparePassword } = require('../utils/hash');
const { generateToken } = require('../utils/jwt');

exports.registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashed = await hashPassword(password);
  const user = await User.create({ name, email, password: hashed });

  const token = generateToken({ id: user._id });
  return { user: { id: user._id, name: user.name, email: user.email }, token };
};

exports.loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = generateToken({ id: user._id });
  return { user: { id: user._id, name: user.name, email: user.email }, token };
};
