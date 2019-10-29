const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

// USER ROUTES
// user
router.get('/me', userController.getMyAccount, userController.getUser);
// sign up route
router.post('/signUp', authController.signUp);
// log in route
router.post('/login', authController.login);
// forgot password
router.post('/forgotPassword', authController.forgotPassword);
// reset password
router.patch('/resetPassword/:token', authController.resetPassword);

// protected routes
router.use(authController.protect);

// update password
router.patch('/updateMyPassword', authController.updatePassword);
// update my account
router.patch('/updateMyAccount', userController.updateMyAccount);
// delete profile
router.delete('/deleteMyAccount', userController.deleteMyAccount);

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
