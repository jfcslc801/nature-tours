const fs = require('fs');
const Tour = require('./../models/tourModel');

// get all tours
exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      status: 'Success',
      results: tours.length,
      data: {
        tours
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: 'Error Gathering Data!'
    });
  }
};

// get tour by id
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'Success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: 'Error Gathering Data!'
    });
  }
};

// create tour
exports.createTour = async (req, res) => {
  try {
    // create new tour
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'Success',
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      message: 'Invalid Data Sent!'
    });
  }
};

// update tour
exports.updateTour = (req, res) => {
  // update to tour
  res.status(200).json({
    status: 'Success',
    data: {
      tour: '<Updated tour here...>'
    }
  });
};

// delete tour
exports.deleteTour = (req, res) => {
  // respose for deleted tour
  res.status(204).json({
    status: 'Success',
    data: null
  });
};
