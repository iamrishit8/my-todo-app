import React from 'react';
import TodoItem from './TodoItem';
import '../styles/TodoList.css';

const TodoList = ({ todos, onToggleTodo, onDeleteTodo }) => {
  if (todos.length === 0) {
    return (
      <div className="empty-list">
        <p>No tasks found. Add a new task to get started!</p>
      </div>
    );
  }

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggle={() => onToggleTodo(todo._id)}
          onDelete={() => onDeleteTodo(todo._id)}
        />
      ))}
    </ul>
  );
};

export default TodoList;
