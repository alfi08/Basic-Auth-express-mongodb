const User = require('../models/UserModel');
const AppError = require('../utils/AppError');
const { generateToken } = require('../utils/tokenManager');

exports.signup = async (req, res, next) => {
  const { name, username, email, password, passwordConfirm } = req.body;

  if (password !== passwordConfirm)
    throw new AppError('Password is not match!', 400);

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
      token: generateToken(newUser._id),
      username: newUser.username,
    },
  });
};

exports.signin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  
  // check if user is exists and password is match
  if( user && (await user.passwordMatch(password))) {
    res.json({
      status: 'susccess',
      data: {
        token: generateToken(user._id),
        name: user.name,
        username: user.username,
        email: user.email,
      },
    });
  }else{
    throw new AppError('Invalid email or password', 400);
  }
};

exports.forgotPassword = (req, res) => {
  res.json({ message: 'forgotPassword endpoint' });
};

exports.resetPassword = (req, res) => {
  res.json({ message: 'resetPassword endpoint' });
};
