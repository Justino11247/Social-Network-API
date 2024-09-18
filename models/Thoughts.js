const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const User = require('./User');

// Schema to create a thoughts model
const thoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 200,
    },
    username: {
      type: String,
      required: true,
      ref: User,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => timestamp.toLocaleString() 
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false,
  }
);

thoughtsSchema
  .virtual('reactionCount')
  .get(function () {
    return this.reactions.length; 
  });

const Thoughts = model('Thoughts', thoughtsSchema);

module.exports = Thoughts;
