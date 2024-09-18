const { Schema, model } = require('mongoose');
const validator = require('validator');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      max_length: 20,
      trim: true
    },
    email: {
      type: String,
      required: true,
      max_length: 20,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: input => `${input} is not a valid email address!`
      }
    },
    thoughts: [{
      type: Schema.Types.ObjectId, 
      ref:'Thoughts'
    }],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
  },
  {
    toJSON: {
      getters: true,
      getters: true
    },
    id: false
  }
);

userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return `${this.friends.length}`;
  });

const User = model('User', userSchema);

module.exports = User;
