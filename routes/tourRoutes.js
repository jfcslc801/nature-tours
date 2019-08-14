const express = require('express');
const fs = require('fs');


const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
)

// get all tours 
const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'Success',
        results: tours.length,
        data: {
            tours
        }
    })
}

// get tour by id 
const getTour = (req, res) => {
    // console re paramaters
    console.log(req.params);
    // convert strings to number (get id)
    const id = req.params.id * 1;
    // find tour by id
    const tour = tours.find(el => el.id === id)
    // if tour is undefined return error
    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'invalid ID'
        });
    }
    res.status(200).json({
        status: 'Success',
        data: {
            tour
        }

    })
}

// create tour
const createTour = (req, res) => {
    // console.log(req.body)
    // new tour id
    const newId = tours[tours.length - 1].id + 1;
    // new tour 
    const newTour = Object.assign({ id: newId }, req.body);
    // push new tour to array
    tours.push(newTour);
    // write file
    fs.writeFile(
        `${__dirname} / dev - data / data / tours - simple.json`,
        JSON.stringify(tours),
        err => {
            res.status(201).json({
                status: 'Success',
                data: {
                    tour: newTour
                }
            });
        }
    );

}

// update tour
const updateTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'invalid ID'
        });
    }
    // update to tour
    res.status(200).json({
        status: 'Success',
        data: {
            tour: '<Updated tour here...>'
        }
    })
}

// delete tour
const deleteTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'invalid ID'
        });
    }
    // respose for deleted tour
    res.status(204).json({
        status: 'Success',
        data: null
    })
}
const router = express.Router();

// app route get all tours and create tour
router
    .route('/')
    .get(getAllTours)
    .post(createTour);

// app route gets tour by ID, creates tour, updates tour
router
    .route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);

module.exports = router;
