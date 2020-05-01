const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true,
    minlength: 10,
    maxlength: 20,
  },
  status: {
    type: String,
    minlength: 5,
    maxlength: 500,
    default: "to-do",
  },
  tags: {
    type: [{ type: String, maxlength: 10 }],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
