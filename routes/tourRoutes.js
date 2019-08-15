const express = require('express');
const tourController = require('./../controllers/tourController')
const router = express.Router();

// id parameters
router.param('id', (req, res, next, val) => {
    console.log(`Tour ID is: , ${val}`)
    next();
})

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
