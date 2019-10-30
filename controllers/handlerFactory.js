const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIfeatures = require('./../utils/apiFeatures');

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

// GET User, Tour and Review handler
exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID!', 404));
    }

    res.status(200).json({
      status: 'Success',
      data: {
        date: doc
      }
    });
  });

// GET all Users, Reviews and Tours handler
exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    //to allow for nested GET reviews on Tour Hack
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };
    // api feature class
    const features = new APIfeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    // execute query
    const doc = await features.query.explain();
    res.status(200).json({
      status: 'Success',
      results: doc.length,
      data: {
        data: doc
      }
    });
  });
