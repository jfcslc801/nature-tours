const fs = require('fs');


const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
)

// check ID for error
exports.checkID = (req, res, next, val) => {
    console.log(`Tour ID is: , ${val}`)

    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'invalid ID'
        });
    }
    next();
}

// get all tours 
exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'Success',
        results: tours.length,
        data: {
            tours
        }
    })
}

// get tour by id 
exports.getTour = (req, res) => {
    // console re paramaters
    console.log(req.params);
    // convert strings to number (get id)
    const id = req.params.id * 1;
    // find tour by id
    const tour = tours.find(el => el.id === id)

    res.status(200).json({
        status: 'Success',
        data: {
            tour
        }

    })
}

// create tour
exports.createTour = (req, res) => {
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
exports.updateTour = (req, res) => {
    // update to tour
    res.status(200).json({
        status: 'Success',
        data: {
            tour: '<Updated tour here...>'
        }
    })
}

// delete tour
exports.deleteTour = (req, res) => {
    // respose for deleted tour
    res.status(204).json({
        status: 'Success',
        data: null
    })
}