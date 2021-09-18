const User = require('../models/UserModel');
const AppError = require('../utils/exception/AppError');
const Email = require('../utils/email/Email');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/tokenManager');

exports.signup = async (req, res) => {
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

  // send welcome email
  await new Email(newUser).sendWelcome();
  
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

exports.forgotPassword = async (req, res) => {
  const {email} = req.body;
  const user = await User.findOne({email});
  
  if(!user){
    throw new AppError('Email is not registered in our data', 404);
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({validateBeforeSave: false});
  await new Email(user);
  res.json({status: 'success', msg: 'Please check your email'});
};

exports.resetPassword = async (req, res) => {
  const {userid, token, password, passwordConfirm} = req.body;

  if (password !== passwordConfirm){
    throw new AppError('Password is not match!', 400);
  }

  const user = User.findOne({
    _id: userid,
    passwordResetExpires: {$gt: Date.now()}
  });

  if(!user){
    throw new AppError('Invalid or expired passsword reset token', 401);
  }
  
  const isTokenValid = await bcrypt.compare(token, user.passwordResetToken);
  
  if(!isTokenValid){
    throw new AppError('Invalid or expired passsword reset token', 401);
  }
  
  await user.findByIdAndUpdate(userid,{
    password,
    passwordResetToken: undefined,
    passwordResetExpires: undefined,
  })

  await new Email(user);

  res.json({
      status: 'susccess update password',
      data: {
        token: generateToken(user._id),
        username: user.username,
      },
  });
};
