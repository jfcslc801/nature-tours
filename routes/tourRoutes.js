const express = require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router();

// 5 cheap top rated tours
router
  .route('/top-5-cheap')
  .get(tourController.topTours, tourController.getAllTours);

// app route get all tours and create tour
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

// app route gets tour by ID, creates tour, updates tour
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
