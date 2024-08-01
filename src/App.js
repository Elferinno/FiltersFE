import React, { useState } from 'react';
import FilterList from './components/FilterList';
import FilterDialog from './components/FilterDialog';
import './App.css';
import './components/FilterDialog.css';
import './components/FilterForm.css';
import './components/FilterList.css';

const App = () => {
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [filters, setFilters] = useState([]);

  const addFilter = (newFilter) => {
    setFilters([...filters, newFilter]);
  };

  const handleOpenFilterDialog = () => {
    setIsFilterDialogOpen(true);
  };

  const handleCloseFilterDialog = () => {
    setIsFilterDialogOpen(false);
  };

  return (
    <div className="App">
      <FilterList filters={filters} />
      <FilterDialog
        isOpen={isFilterDialogOpen}
        onRequestClose={handleCloseFilterDialog}
        addFilter={addFilter}
        isModal={true}
      />
    </div>
  );
};

export default App;
