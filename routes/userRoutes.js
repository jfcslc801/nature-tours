const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

// USER ROUTES
// sign up route
router.post('/signUp', authController.signUp);
// log in route
router.post('/login', authController.login);
// forgot password
router.post('/forgotPassword', authController.forgotPassword);
// reset password
router.post('/resetPassword', authController.resetPassword);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
