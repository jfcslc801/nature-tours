// const fs = require('fs');
const Tour = require('./../models/tourModel');
const APIfeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory.js');

// top five cheap tours
exports.topTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverge,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

// get all tours
exports.getAllTours = catchAsync(async (req, res, next) => {
  // api feature class
  const features = new APIfeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  // execute query
  const tours = await features.query;
  res.status(200).json({
    status: 'Success',
    results: tours.length,
    data: {
      tours
    }
  });
});

// get tour by id
exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id).populate('reviews');

  if (!tour) {
    return next(new AppError('No Tour found with that ID!', 404));
  }

  res.status(200).json({
    status: 'Success',
    data: {
      tour
    }
  });
});

// CREATE TOUR
exports.createTour = factory.createOne(Tour);
// UPDATE TOUR
exports.updateTour = factory.updateOne(Tour);
// DELETE TOUR
exports.deleteTour = factory.deleteOne(Tour);

// tour stats
exports.getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingAverage: { $gte: 4.5 } }
    },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numTours: { $sum: 1 },
        numRatings: { $sum: '$ratingQuantity' },
        avgRating: { $avg: '$ratingAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' }
      }
    },
    {
      $sort: { avgPrice: 1 }
    }
  ]);
  res.status(200).json({
    status: 'Success',
    data: {
      stats
    }
  });
});

// get monthly plan
exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;
  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates'
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`)
        }
      }
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTours: { $sum: 1 },
        tours: { $push: '$name' }
      }
    },
    {
      $addFields: { month: '$_id' }
    },
    {
      $project: {
        _id: 0
      }
    },
    {
      $sort: { numTours: -1 }
    },
    {
      $limit: 12
    }
  ]);
  res.status(200).json({
    status: 'Success',
    data: {
      plan
    }
  });
});
