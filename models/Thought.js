const {Schema, model, Types} = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    require: true,
    maxlength: 280,
  },
  username: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: function(value) {
      return moment(value).format('YYYY-MM-DD HH:mm a');
    }
  },
},
  {
    toJSON: {
      getters: true,
    },
  });

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
    get: function(value) {
      return moment(value).format('YYYY-MM-DD HH:mm a');
    }
  },
  reactions: [reactionSchema]
})

const Thought = model('thought', thoughtSchema)


module.exports = Thought;