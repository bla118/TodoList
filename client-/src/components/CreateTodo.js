import React, { useState } from 'react';
import axios from 'axios';
import './CreateTodo.css';

const CreateTodo = ({ onTodoCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the Flask API endpoint
      const response = await axios.post('/api/todos', {
        title,
        description,
      });

      // Assuming the response contains the newly created todo
      console.log('New Todo:', response.data);

      // Reset the form fields
      setTitle('');
      setDescription('');

      // Callback to notify the parent component (App) that a new todo has been created
      onTodoCreated();
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  return (
    <div className="create-todo-container">
      <h2>Create a New Todo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="create-todo-label">Title:</label>
          <input
            className="create-todo-input"
            type="text"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div>
          <label className="create-todo-label">Description:</label>
          <input
            className="create-todo-input"
            type="text"
            value={description}
            onChange={handleDescriptionChange}
            required
          />
        </div>
        <button className="create-todo-button" type="submit">
          Create Todo
        </button>
      </form>
    </div>
  );
};

export default CreateTodo;
