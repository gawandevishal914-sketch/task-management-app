const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let tasks = [];

// Get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Add task
app.post("/tasks", (req, res) => {
  const task = {
    id: Date.now(),
    title: req.body.title,
    completed: false,
  };

  tasks.push(task);

  res.json(task);
});

// Update task completion
app.put("/tasks/:id", (req, res) => {
  tasks = tasks.map((task) => {
    if (task.id == req.params.id) {
      task.completed = !task.completed;
    }

    return task;
  });

  res.json({
    message: "Task Updated",
  });
});

// Delete task
app.delete("/tasks/:id", (req, res) => {
  tasks = tasks.filter((task) => task.id != req.params.id);

  res.json({
    message: "Task Deleted",
  });
});

app.listen(5000, () => {
  console.log("Server running on 5000");
});