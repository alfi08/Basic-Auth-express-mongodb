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
  // check if there is password on request body
  if(req.body.password) throw new AppError(`Can't update password on this route`, 403);

  // check if upload image
  if(req.file) req.body.photo = req.file.filename;

  const user = await User.findByIdAndUpdate(userid, {...req.body}, {
    new: true,
    runValidators: true,
  }).select('-password');

  res.json({
    status: 'success',
    msg: 'data updated',
    data: user,
  });
}