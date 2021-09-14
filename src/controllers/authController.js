const User = require('../models/UserModel');
const CatchAsync = require('../utils/CatchAsync');
const AppError = require('../utils/AppError');

exports.signup = CatchAsync(async (req, res, next) => {
  const { name, username, email, password, passwordConfirm } = req.body;

  if(password !== passwordConfirm) throw new AppError('Password is not match!', 403);

  const newUser = await User.create({
    name,
    username,
    email,
    password,
    passwordConfirm,
  });

  res.json({
    status: 'success',
    data: {
      username: newUser.username,
    } 
  });
});

exports.signin = (req, res) => {
  res.json({ message: 'signin endpoint' });
};

exports.logout = (req, res) => {
  res.json({ message: 'logout endpoint' });
};

exports.forgotPassword = (req, res) => {
  res.json({ message: 'forgotPassword endpoint' });
};

exports.resetPassword = (req, res) => {
  res.json({ message: 'resetPassword endpoint' });
};
