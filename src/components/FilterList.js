// src/components/FilterList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Switch, FormControlLabel, Typography } from '@mui/material';
import FilterDialog from './FilterDialog';

const FilterList = () => {
  const [filters, setFilters] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal, setIsModal] = useState(true);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/filters');
        setFilters(response.data);
      } catch (error) {
        console.error('Error fetching filters:', error);
      }
    };

    fetchFilters();
  }, []);

  const handleAddFilter = (newFilter) => {
    setFilters([...filters, newFilter]);
    setIsModalOpen(false);
  };

  return (
    <div>
      <Typography variant="h4">Filter Management</Typography>
      <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>
        Add Filter
      </Button>
      <FormControlLabel
        control={<Switch checked={isModal} onChange={(e) => setIsModal(e.target.checked)} />}
        label="Modal View"
      />
      <Typography variant="h5" sx={{ marginTop: 2 }}>Saved Filters</Typography>
      {filters.map((filter) => (
        <div key={filter.id}>
          <Typography variant="h6">{filter.name}</Typography>
          {filter.criteriaList.map((criteria, i) => (
            <Typography key={i}>{criteria.type} - {criteria.condition} - {criteria.value}</Typography>
          ))}
        </div>
      ))}
      {isModal && (
        <FilterDialog 
          isOpen={isModalOpen} 
          onRequestClose={() => setIsModalOpen(false)} 
          addFilter={handleAddFilter} 
          isModal={isModal}
        />
      )}
      {!isModal && isModalOpen && (
        <FilterDialog 
          isOpen={true} 
          onRequestClose={() => setIsModalOpen(false)} 
          addFilter={handleAddFilter} 
          isModal={isModal}
        />
      )}
    </div>
  );
};

export default FilterList;
