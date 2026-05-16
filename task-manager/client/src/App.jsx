import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // Fetch tasks
  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task
  const addTask = async () => {
    if (title.trim() === "") return;

    await axios.post("http://localhost:5000/tasks", {
      title,
    });

    setTitle("");
    fetchTasks();
  };

  // Delete task
  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    fetchTasks();
  };

  // Toggle complete
  const toggleTask = async (id) => {
    await axios.put(`http://localhost:5000/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center p-5">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg">
        <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">
          Task Manager
        </h1>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter task..."
            className="border p-3 flex-1 rounded-lg outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button
            onClick={addTask}
            className="bg-blue-600 text-white px-5 rounded-lg hover:bg-blue-700"
          >
            Add
          </button>
        </div>

        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex justify-between items-center bg-gray-100 p-4 rounded-lg"
            >
              <span
                onClick={() => toggleTask(task.id)}
                className={`cursor-pointer font-medium ${
                  task.completed
                    ? "line-through text-gray-500"
                    : "text-black"
                }`}
              >
                {task.title}
              </span>

              <button
                onClick={() => deleteTask(task.id)}
                className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;