const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name!']
  },
  email: {
    type: String,
    required: [true, 'Please provide email!'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide valid email!']
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please provide password!'],
    minlength: 8
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm password!']
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
