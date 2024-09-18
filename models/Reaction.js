const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
      // This is used as a custom id for the reaction, separate from the default _id
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true,
      ref: 'User', // This creates a reference to the User model
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => {
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