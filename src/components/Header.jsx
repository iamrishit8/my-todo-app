import React from 'react';
import { CheckCircle } from 'lucide-react';
import '../styles/Header.css';

const Header = ({ onFilterChange, currentFilter }) => {
  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo">
          <CheckCircle size={28} />
          <h1>Todo App</h1>
        </div>
        
        <nav className="filters">
          <button 
            className={currentFilter === 'all' ? 'active' : ''} 
            onClick={() => onFilterChange('all')}
          >
            All
          </button>
          <button 
            className={currentFilter === 'active' ? 'active' : ''} 
            onClick={() => onFilterChange('active')}
          >
            Active
          </button>
          <button 
            className={currentFilter === 'completed' ? 'active' : ''} 
            onClick={() => onFilterChange('completed')}
          >
            Completed
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
