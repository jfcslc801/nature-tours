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
router.patch('/resetPassword/:token', authController.resetPassword);

// protect all routes below
router.use(authController.protect);

// update password
router.patch('/updateMyPassword', authController.updatePassword);
// get current user route
router.get('/me', userController.getMyAccount, userController.getUser);
// update my account
router.patch('/updateMyAccount', userController.updateMyAccount);
// delete profile
router.delete('/deleteMyAccount', userController.deleteMyAccount);

// restrict routes below to admin
router.use(authController.restrictTo('admin'));

// get all users & create user route
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

// get user, update user and delete user
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
