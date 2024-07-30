import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilterList from './components/FilterList';
import FilterForm from './components/FilterForm';
import './App.css';

const App = () => {
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    fetchFilters();
  }, []);

  const fetchFilters = async () => {
    try {
      const response = await axios.get('/api/filters');
      setFilters(response.data);
    } catch (error) {
      console.error('Error fetching filters:', error);
    }
  };

  const addFilter = (newFilter) => {
    setFilters([...filters, newFilter]);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Filter Management</h1>
      </header>
      <main>
        <FilterForm addFilter={addFilter} />
        <FilterList filters={filters} />
      </main>
    </div>
  );
};

export default App;
