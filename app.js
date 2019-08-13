const fs = require('fs');
const express = require('express');
const app = express();

// Json middleware
app.use(express.json());

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
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
// get all tours 
app.get('/api/v1/tours', getAllTours);

// get tour by id
app.get('/api/v1/tours/:id', (req, res) => {
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

});

// tours post route
app.post('/api/v1/tours', (req, res) => {
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

});

// update tour by id
app.patch('/api/v1/tours/:id', (req, res) => {
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
})
// delete tour by id
app.delete('/api/v1/tours/:id', (req, res) => {
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
})


const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`)
});
