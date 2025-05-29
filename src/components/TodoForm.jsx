import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import '../styles/TodoForm.css';

const TodoForm = ({ onAddTodo }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (text.trim()) {
      onAddTodo(text);
      setText('');
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        className="todo-input"
      />
      <button type="submit" className="add-button" disabled={!text.trim()}>
        <Plus size={20} />
        Add
      </button>
    </form>
  );
};

export default TodoForm;
