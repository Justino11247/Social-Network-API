const { Schema, Types } = require('mongoose');
const User = require('./User');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlenght: 280
    },
    username: {
      type: String,
      required: true,
      ref: 'User',
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: function(timestamp) {
        return timestamp instanceof Date 
          ? timestamp.toLocaleString() 
          : new Date(timestamp).toLocaleString();
      }
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
