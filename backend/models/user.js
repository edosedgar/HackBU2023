const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    maxLength: 7
  },
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  middle_name: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);