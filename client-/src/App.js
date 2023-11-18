import React, { useState } from 'react';
import CreateTodo from './components/CreateTodo'; 
import DisplayTodo from './components/DisplayTodo';

function App() {
  const [todoCreated, setTodoCreated] = useState(false);

  const handleTodoCreated = () => {
    // Called when a new todo is created
    setTodoCreated(!todoCreated); // Toggle the state to trigger a re-fetch in DisplayTodo
  };

  return (
    <div className="App">
      <CreateTodo onTodoCreated={handleTodoCreated} />
      <DisplayTodo onTodoCreated={handleTodoCreated} />
    </div>
  );
}

export default App;
