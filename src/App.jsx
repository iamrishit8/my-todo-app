import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { fetchTodos, addTodo, updateTodo, deleteTodo } from './services/api';
import './styles/App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        setIsLoading(true);
        const data = await fetchTodos();
        setTodos(data);
        setError(null);
        setRetryCount(0);
      } catch (err) {
        console.error('Error loading todos:', err);
        setError(err instanceof Error ? err.message : 'Failed to load todos');
        
        if (retryCount < 3) {
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
          }, 2000 * (retryCount + 1));
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();
  }, [retryCount]);

  const handleAddTodo = async (text) => {
    try {
      const newTodo = await addTodo(text);
      setTodos([newTodo, ...todos]);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add todo');
    }
  };

  const handleToggleTodo = async (id) => {
    try {
      const todoToToggle = todos.find(todo => todo._id === id);
      if (!todoToToggle) return;
      
      const updatedTodo = await updateTodo(id, {
        completed: !todoToToggle.completed,
      });
      
      setTodos(
        todos.map(todo => (todo._id === id ? updatedTodo : todo))
      );
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update todo');
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo._id !== id));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete todo');
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Header onFilterChange={setFilter} currentFilter={filter} />
        <main className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <TodoForm onAddTodo={handleAddTodo} />
          
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-md mt-4 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}
          
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <TodoList 
              todos={filteredTodos} 
              onToggleTodo={handleToggleTodo} 
              onDeleteTodo={handleDeleteTodo} 
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
