const fs = require('fs');
const Tour = require('./../models/tourModel');

// get all tours
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'Success'
    // results: tours.length,
    // data: {
    //   tours
    // }
  });
};

// get tour by id
exports.getTour = (req, res) => {
  // console re paramaters
  console.log(req.params);
  // convert strings to number (get id)
  //   const id = req.params.id * 1;
  //   // find tour by id
  //   const tour = tours.find(el => el.id === id);
  //   res.status(200).json({
  //     status: 'Success',
  //     data: {
  //       tour
  //     }
  //   });
};

// create tour
exports.createTour = async (req, res) => {
  // create new tour
  const newTour = await Tour.create(req.body);

  res.status(201).json({
    status: 'Success',
    data: {
      tour: newTour
    }
  });
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
