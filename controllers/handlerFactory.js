const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

// DELETE review, user and tour factory handler
exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID!', 404));
    }

    res.status(204).json({
      status: 'Success',
      data: null
    });
  });

// UPDATE review, user and tour factory handler
exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!doc) {
      return next(new AppError('No document found with that ID!', 404));
    }

    // update to doc
    res.status(200).json({
      status: 'Success',
      data: {
        data: doc
      }
    });
  });

// CREATE review, user and tour handler
exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'Success',
      data: {
        data: doc
      }
    });
  });
