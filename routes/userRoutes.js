const express = require('express');

const getAllUsers = (req, res) => {
    // respose for deleted tour
    res.status(500).json({
        status: 'Error',
        message: 'This route not implemented'
    })
}
const getUser = (req, res) => {
    // respose for deleted tour
    res.status(500).json({
        status: 'Error',
        message: 'This route not implemented'
    })
}
const createUser = (req, res) => {
    // respose for deleted tour
    res.status(500).json({
        status: 'Error',
        message: 'This route not implemented'
    })
}
const updateUser = (req, res) => {
    // respose for deleted tour
    res.status(500).json({
        status: 'Error',
        message: 'This route not implemented'
    })
}
const deleteUser = (req, res) => {
    // respose for deleted tour
    res.status(500).json({
        status: 'Error',
        message: 'This route not implemented'
    })
}


// ROUTES
const router = express.Router();


// USER ROUTES
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

router
    .route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

module.exports = router;