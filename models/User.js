const {Schema, model, Types} = require('mongoose');


const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  },
  thoughts: [{ type: Types.ObjectId, ref: 'thought' }],
  friends: [
    {
      type: Types.ObjectId,
      ref: 'user',
    },
    ],
  },
);

const User = model('user', userSchema)

module.exports = User;