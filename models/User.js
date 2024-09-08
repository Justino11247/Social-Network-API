const { Schema, model } = require('mongoose');
const Thoughts = require('./Thoughts');
const validator = require('validator');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      max_length: 20,
    },
    email: {
      type: String,
      required: true,
      max_length: 20,
      validate: {
        validator: validator.isEmail,
        message: input => `${input} is not a valid email address!`
      }
    },
    thoughts: [Thoughts],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model('user', userSchema);

module.exports = User;
