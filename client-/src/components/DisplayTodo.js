import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DisplayTodo.css'; // Import the CSS file

const DisplayTodo = ({ onTodoCreated }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('/api/todos');
        console.log('API Response:', response.data.todos);
        setTodos(response.data.todos);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, [onTodoCreated]); // Include onTodoCreated in the dependency array

  const handleComplete = async (id, completed) => {
    try {
      await axios.put(`/api/todos/${id}`, {
        completed: !completed, // Toggle the completed status
      });
      // Update the completed status in the local state
      const updatedTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !completed };
        }
        return todo;
      });
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      const updatedList = todos.filter((todo) => todo.id !== id);
      setTodos(updatedList);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="todo-container">
      <h2>Todo List</h2>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <strong className={`todo-title ${todo.completed ? 'completed' : ''}`}>{todo.title}</strong>
            <p className="todo-description">{todo.description}</p>
            <p className="todo-details">Created At: {new Date(todo.created_at).toLocaleString()}</p>
            <p className="todo-details">Completed: {todo.completed ? 'Yes' : 'No'}</p>
            <div className="todo-actions">
              <button onClick={() => handleComplete(todo.id, todo.completed)}>
                {todo.completed ? 'Uncheck' : 'Check'}
              </button>
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayTodo;
