const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    required: [true, 'Please confirm password!'],
    validate: {
      // this only works on create and save new user
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!'
    }
  }
});

// password encryption
UserSchema.pre('save', async function(next) {
  // only run if password was modified
  if (!this.isModified('password')) return next();
  // hash password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // delete password confirm field
  this.passwordConfirm = undefined;

  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
