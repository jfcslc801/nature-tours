const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const sendEmail = require('./../utils/email');

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
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
    role: req.body.role
  });

  // json web token
  const token = signToken(newUser._id);

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
    return next(new AppError('Please provide valid email and password!', 400));
  }

  // check if user exists and password is correct
  const user = await User.findOne({ email }).select('+password');
  // console.log(user);

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password!', 401));
  }

  // if all is authenticated, send web token
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token
  });
});

// route protect access
exports.protect = catchAsync(async (req, res, next) => {
  // getting token and check if it is available
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in, please login to get access!', 401)
    );
  }

  // verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // check if user exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('No user found, invalid token!', 401));
  }

  // check if user changed password
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        'User password does not match records, please try logging in!',
        401
      )
    );
  }
  // grant access to protected route
  req.user = currentUser;
  next();
});

// delete restrictions - only admin and lead-guide can delete
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action!', 403)
      );
    }
    next();
  };
};

// forgot password
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // get user by email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new AppError('No user found with specified email address!', 404)
    );
  }
  // generate token
  const resetToken = user.createPaswordResetToken();
  await user.save({ validateBeforeSave: false });

  //send it to user email
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/users/resetPassword/${resetToken}`;

  const message = `Please click here ${resetURL} to reset your password! \n 
  If you did not make request to change password please ignore email.`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token! (expires in 10 minutes)',
      message
    });
    res.status(200).json({
      status: 'success',
      message: 'Token sent to email'
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError('There was an error sending email, please try again!'),
      500
    );
  }
});

// reset password
exports.resetPassword = catchAsync(async (req, res, next) => {
  // get user based on token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  // set new password only if token has not expired for existing user
  if (!user) {
    return next(new AppError('Token is not valid or has expeired!', 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  // update changePasswordAt property for current user
  // log user in, send JWT
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token
  });
});
