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
// update password
router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);
// update my account
router.patch(
  '/updateMyAccount',
  authController.protect,
  userController.updateMyAccount
);
// delete profile
router.delete(
  '/deleteMyAccount',
  authController.protect,
  userController.deleteMyAccount
);

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
