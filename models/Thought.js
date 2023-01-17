const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema ({
  thoughtText: {
    type: String,
    required: [true, "You need to leave a thought"],
    minLength: [1, "thought cannot be empty"],
    maxLength: [280, "though cannot be longer than 280 characters"]
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    get: timestamp =>  timestamp.toLocaleString()
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema]
}, {
  toJSON: {
    virtuals: true,
  }
})

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
})

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;