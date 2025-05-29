import React from 'react';
import { Check, Trash2 } from 'lucide-react';
import '../styles/TodoItem.css';

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <button 
        className="toggle-button" 
        onClick={onToggle}
        aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
      >
        <span className="checkbox">
          {todo.completed && <Check size={16} />}
        </span>
      </button>
      
      <span className="todo-text">{todo.text}</span>
      
      <button 
        className="delete-button" 
        onClick={onDelete}
        aria-label="Delete todo"
      >
        <Trash2 size={18} />
      </button>
    </li>
  );
};

export default TodoItem;
