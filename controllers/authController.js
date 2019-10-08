const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });

  // json web token
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser
    }
  });
});

// login
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // check email and password exists
  if (!email || !password) {
    next(new AppError('Please provide valid email and password!', 400));
  }

  // check if user exists and password is correct
  const user = await User.findOne({ email }).select('+password');

  console.log(user);

  // if all is authenticated, send web token
  const token = '';
  res.status(200).json({
    status: 'success',
    token
  });
});
