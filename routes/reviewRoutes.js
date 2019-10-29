const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController.js');

const router = express.Router({ mergeParams: true });

// protected routes middleware
router.use(authController.protect);

// get all reviews and create new review routes
router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview
  );

// get, update and delete review route
router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewController.updateReview
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    reviewController.deleteReview
  );

module.exports = router;
