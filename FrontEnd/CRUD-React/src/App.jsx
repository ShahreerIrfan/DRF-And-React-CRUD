import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get('http://127.0.0.1:8000/api/task/')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  };

  const addTask = () => {
    axios.post('http://127.0.0.1:8000/api/task/', newTask)
      .then(response => {
        setTasks([...tasks, response.data]);
        setNewTask({ title: '', description: '' });
      })
      .catch(error => console.error('Error adding task:', error));
  };

  const fetchTask = (id) => {
    axios.get(`http://127.0.0.1:8000/api/task/${id}/`)
      .then(response => setSelectedTask(response.data))
      .catch(error => console.error('Error fetching task:', error));
  };

  const updateTask = (id) => {
    axios.put(`http://127.0.0.1:8000/api/task/${id}/`, selectedTask)
      .then(() => {
        fetchTasks();
        setSelectedTask(null);
      })
      .catch(error => console.error('Error updating task:', error));
  };

  const deleteTask = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/task/${id}/`)
      .then(() => {
        fetchTasks();
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  const handleSelectedTaskChange = (e) => {
    setSelectedTask({ ...selectedTask, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-8 text-indigo-600">Todo List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map(task => (
          <div key={task.id} className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{task.title}</h2>
              <p className="text-gray-600 mt-2">{task.description}</p>
            </div>
            <div className="flex justify-between items-center bg-gray-100 p-4">
              <button className="text-xs font-semibold text-gray-600 uppercase px-3 py-1 rounded border border-gray-600 hover:bg-gray-200" onClick={() => fetchTask(task.id)}>Edit</button>
              <button className="text-xs font-semibold text-red-600 uppercase px-3 py-1 rounded border border-red-600 hover:bg-red-600 hover:text-white transition duration-300 ease-in-out" onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <input
          className="border border-gray-300 p-2 rounded mr-2 focus:outline-none focus:border-indigo-500"
          name="title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          placeholder="Title"
        />
        <input
          className="border border-gray-300 p-2 rounded mr-2 focus:outline-none focus:border-indigo-500"
          name="description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          placeholder="Description"
        />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-300 ease-in-out" onClick={addTask}>Add Task</button>
      </div>
      {selectedTask && (
        <div className="mt-8">
          <input
            className="border border-gray-300 p-2 rounded mr-2 focus:outline-none focus:border-indigo-500"
            name="title"
            value={selectedTask.title}
            onChange={handleSelectedTaskChange}
            placeholder="Title"
          />
          <input
            className="border border-gray-300 p-2 rounded mr-2 focus:outline-none focus:border-indigo-500"
            name="description"
            value={selectedTask.description}
            onChange={handleSelectedTaskChange}
            placeholder="Description"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 ease-in-out" onClick={() => updateTask(selectedTask.id)}>Update Task</button>
        </div>
      )}
    </div>
  );
}

export default App;
