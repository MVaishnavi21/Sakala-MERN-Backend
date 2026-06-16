const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  isShipping: { type: Boolean, default: true }
});

module.exports = mongoose.model('User', userSchema);
