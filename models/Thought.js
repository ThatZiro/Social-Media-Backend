const {Schema, model, Types} = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
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
  thoughtBody: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
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