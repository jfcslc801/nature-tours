const express = require('express');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');

const router = express.Router();

// 5 cheap top rated tours
router
  .route('/top-5-cheap')
  .get(tourController.topTours, tourController.getAllTours);

//stats route
router.route('/tour-stats').get(tourController.getTourStats);

//monthly plan route
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

// app route get all tours and create tour
router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);

// app route gets tour by ID, creates tour, updates tour
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router;
