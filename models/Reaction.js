const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: new Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: true,
    maxLength:[280, 'Cannot be longer than 280 characters']
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    get: timestamp =>  timestamp.toLocaleString()
  }
}, {
  id: false,
})

module.exports = reactionSchema;