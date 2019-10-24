const Review = require('../models/reviewModel');
const factory = require('./handlerFactory.js');

exports.setTourUserIds = (req, res, next) => {
  // allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

// GET ALL REVIEWS
exports.getAllReviews = factory.getAll(Review);
// GET REVIEW
exports.getReview = factory.getOne(Review);
// CREATE REVIEW
exports.createReview = factory.createOne(Review);
// UPDATE REVIEW
exports.updateReview = factory.updateOne(Review);
// DELETE REVIEW
exports.deleteReview = factory.deleteOne(Review);
