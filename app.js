const fs = require('fs');
const express = require('express');
const app = express();

// Json middleware
app.use(express.json());

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
)

// tours get route
app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'Success',
        results: tours.length,
        data: {
            tours
        }
    })

});

// get tour by id
app.get('/api/v1/tours/:id', (req, res) => {
    // console re paramaters
    console.log(req.params);
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id)

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


const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`)
});
