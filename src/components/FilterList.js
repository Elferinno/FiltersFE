import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Switch, FormControlLabel, Typography, Grid, Card, CardContent, CardHeader, Box } from '@mui/material';
import FilterDialog from './FilterDialog';
import './FilterList.css';

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
    <div className="filter-list-container">
      <Box className="header-container">
        <Typography variant="h4" className="header">Filter Management</Typography>
        <Box className="controls">
          <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)} className="add-filter-button">
            Add Filter
          </Button>
          <FormControlLabel
            control={<Switch checked={isModal} onChange={(e) => setIsModal(e.target.checked)} />}
            label="Modal View"
            className="modal-switch"
          />
        </Box>
      </Box>
      <Box className="dialog-container">
        {!isModal && isModalOpen && (
          <FilterDialog 
            isOpen={true} 
            onRequestClose={() => setIsModalOpen(false)} 
            addFilter={handleAddFilter} 
            isModal={isModal}
          />
        )}
      </Box>
      <Typography variant="h5" className="subheader">Saved Filters</Typography>
      <Grid container spacing={3} className="filter-dashboard">
        {filters.map((filter) => (
          <Grid item key={filter.id} xs={12} sm={6} md={4}>
            <Card className="filter-card">
              <CardHeader title={filter.name} className="filter-card-header" />
              <CardContent>
                {filter.criteriaList.map((criteria, i) => (
                  <div key={i} className="criteria-container">
                    <Typography className="criteria-text"><strong>Type:</strong> {criteria.type}</Typography>
                    <Typography className="criteria-text"><strong>Condition:</strong> {criteria.condition}</Typography>
                    <Typography className="criteria-text"><strong>Value:</strong> {criteria.value}</Typography>
                  </div>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {isModal && (
        <FilterDialog 
          isOpen={isModalOpen} 
          onRequestClose={() => setIsModalOpen(false)} 
          addFilter={handleAddFilter} 
          isModal={isModal}
        />
      )}
    </div>
  );
};

export default FilterList;
