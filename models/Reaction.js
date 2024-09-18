const { Schema, Types } = require('mongoose');
const User = require('./User');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionName: {
      type: String,
      required: true,
      maxlength: 200,
      default: 'Unnamed reaction',
    },
    username: {
      type: String,
      required: true,
      ref: 'User',
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => timestamp.tolocaleString()
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;
