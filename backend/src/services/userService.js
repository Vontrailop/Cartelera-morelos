const User = require('../models/User');

exports.registerUser = async (userData) => {
  const user = new User(userData);
  await user.save();
  return user;
};

exports.findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

exports.getAllUsers = async () => {
  return await User.find().select('-password');
};
