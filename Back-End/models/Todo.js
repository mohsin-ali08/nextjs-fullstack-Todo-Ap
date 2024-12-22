const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false }, // Add completed field
});

module.exports = mongoose.model('Todo', todoSchema);
