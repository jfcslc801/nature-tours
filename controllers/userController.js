const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

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
