const mongoose = require("mongoose");

const TasksSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
  },
});

const TaskModel = mongoose.model("task", TasksSchema);
module.exports = TaskModel;
