const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TaskModel = require("./models/Tasks");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://todoAdmin:1as7P2XQDsd8fzZ9@todo.4jbwlz1.mongodb.net/todo?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

app.get("/getTasks", (req, res) => {
  TaskModel.find({}).then((err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/createTask", async (req, res) => {
  const task = req.body;
  const newTask = new TaskModel(task);
  await newTask.save();
  res.json(newTask);
});

app.put("/updateTask", async (req, res) => {
  const updateTaskModel = req.body.task;
  const id = req.body.id;
  const changeToFillFunction = { task: updateTaskModel };

  await TaskModel.findByIdAndUpdate(id, changeToFillFunction, {
    new: true,
  });

  TaskModel.find({}).then((err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.put("/updateStatus", async (req, res) => {
  const updateTaskModel = req.body.status;
  const id = req.body.id;
  const changeStatus = { status: updateTaskModel };

  await TaskModel.findByIdAndUpdate(id, changeStatus, {
    new: true,
  });

  TaskModel.find({}).then((err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.delete("/deleteTask/:id", async (req, res) => {
  const id = req.params.id;
  await TaskModel.findByIdAndRemove(id).exec();

  TaskModel.find({}).then((err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
