const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please provide your name'],
  },
  username: {
    type: String,
    required: [true, 'please provide your username'],
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: [true, 'please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'please provide your password'],
  },
  photo: {
    type: String,
    default: 'default.png'
  },
  passwordChangeAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

// hash password before save
userSchema.pre('save', async function(next){
  // check if password is modified when save data
  if(!this.isModified('password')) next();

  // generate hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(this.password, salt);

  this.password = hashPassword;
});

// check if password match
userSchema.methods.passwordMatch = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.createPasswordResetToken = async function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  const salt = await bcrypt.genSalt(10);
  this.passwordResetToken = await bcrypt.hash(resetToken, salt);
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
}

const User = mongoose.model('User', userSchema);

module.exports = User;