const { verifyToken } = require('../utils/tokenManager');
const User = require('../models/UserModel');
const AppError = require('../utils/exception/AppError');

module.exports = async (req, res, next) => {
  let token = req.headers.authorization;

  if(token && token.startsWith('Bearer')){
    token = token.split(' ')[1];
    const decoded = verifyToken(token);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  }else{
    throw new AppError('Invalid token', 403);
  }
};
