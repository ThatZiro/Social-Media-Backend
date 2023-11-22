const {Schema, model, Types} = require('mongoose');
const thoughtSchema = require('./Thought')

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    require: true,
    max_length: 50,
  },
  email: {
    type: String,
    unique: true,
    require: true,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  },
  thoughts: [thoughtSchema],
  friends: [
    {
      type: Types.ObjectId,
      ref: 'User',
    },
    ],
  },
);

const User = model('user', userSchema)

module.exports = User;