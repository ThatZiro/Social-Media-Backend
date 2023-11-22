const {Schema} = require('mongoose');

const thoughtSchema = new Schema({
  reactionBody: {
    type: String,
    require: true,
    minlength: 1,
    maxlength: 280,
  },
  username: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    //TODO Use a getter method to format the timestamp on query
  },
  //TODO move Reaction schema here
})

module.exports = thoughtSchema;