const User = require('../models/UserModel');
const AppError = require('../utils/AppError');

exports.getUser = async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username }).select('-password');

  if(!user) throw new AppError('username not found!', 404);

  res.json({
    status: 'success',
    data: user,
  });
};

exports.updateUser = async (req, res) => {
  const userid = req.user._id;
  const updatedUser = await User.findByIdAndUpdate(userid, {...req.body});
  res.json({
    status: 'success',
    msg: 'data updated'
  });
}