const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    default: 'User',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  pause: {
    type: Boolean,
    default: false,
  },
})

module.exports = mongoose.model('user', UserSchema)
