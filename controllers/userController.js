const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

// filter body object
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};

  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMyAccount = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};
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

exports.createUser = (req, res) => {
  // respose for deleted tour
  res.status(500).json({
    status: 'Error',
    message: 'This route not implemented, please use sign up'
  });
};

// GET ALL USERS
exports.getAllUsers = factory.getAll(User);
// GET USER
exports.getUser = factory.getOne(User);
// UPDATE USER
exports.updateUser = factory.updateOne(User);
// DELETE USER
exports.deleteUser = factory.deleteOne(User);
