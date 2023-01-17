const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String, 
    unique: [true,"someone is using this username already :("],
    required: [true, "username cannot be empty"],
    trim: true
  },
  email: {
    type: String,
    unique: [true, "this email is already registered"],
    required: [true, "email cannot be empty"],
    match: [/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "email not valid."]
  },
  thoughts: [{
    type: Schema.Types.ObjectId,
    ref: 'Thought'
  }],
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  toJSON: {
    virtuals: true
  }
});

userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = model('User', userSchema);

model.exports = User;