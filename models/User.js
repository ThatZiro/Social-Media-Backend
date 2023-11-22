const {Schema, model} = require('mongoose');
const thoughtSchema = require('./Thought')

const userSchema = new Schema({
  username: {
    type: String,
    //TODO is Unique
    require: true,
    max_length: 50,
  },
  email: {
    type: String,
    //TODO is Unique
    require: true,
    //TODO Email Validation
  },
  thoughts: [thoughtSchema],
  // TODO friends: [userSchema],
})

const User = model('user', userSchema)

module.exports = User;