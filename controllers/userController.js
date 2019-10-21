const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

// filter body object
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};

  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: 'Success',
    results: users.length,
    data: {
      users
    }
  });
});

exports.updateMyAccount = catchAsync(async (req, res, next) => {
  // create error if user updates password
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'Unable to update password. Please visit tours/updatePassword!',
        400
      )
    );
  }
  // filtered out unwanted field names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');
  // update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });
  res.status(200).json({
    status: 'Success',
    data: {
      user: updatedUser
    }
  });
});

// delete account (suspend)
exports.deleteMyAccount = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.getUser = (req, res) => {
  // respose for deleted tour
  res.status(500).json({
    status: 'Error',
    message: 'This route not implemented'
  });
};
exports.createUser = (req, res) => {
  // respose for deleted tour
  res.status(500).json({
    status: 'Error',
    message: 'This route not implemented'
  });
};
exports.updateUser = (req, res) => {
  // respose for deleted tour
  res.status(500).json({
    status: 'Error',
    message: 'This route not implemented'
  });
};
exports.deleteUser = (req, res) => {
  // respose for deleted tour
  res.status(500).json({
    status: 'Error',
    message: 'This route not implemented'
  });
};
