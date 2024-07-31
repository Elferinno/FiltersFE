import React, { useState } from 'react';
import FilterForm from './components/FilterForm';
import FilterList from './components/FilterList';
import './App.css';
import './components/FilterDialog.css';

const App = () => {
  const [filters, setFilters] = useState([]);

  const addFilter = (newFilter) => {
    setFilters([...filters, newFilter]);
  };

  return (
    <div>
      <h1>Filter Application</h1>
      <FilterForm addFilter={addFilter} />
      <FilterList filters={filters} />
    </div>
  );
};

export default App;
