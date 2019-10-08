const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });

  // json web token
  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token
  });
});

// login
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // check email and password exists
  if (!email || !password) {
    return next(new AppError('Please provide valid email and password!', 400));
  }

  // check if user exists and password is correct
  const user = await User.findOne({ email }).select('+password');
  console.log(user);

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password!', 401));
  }

  // if all is authenticated, send web token
  const token = signToken(User._id);
  res.status(200).json({
    status: 'success',
    token
  });
});
