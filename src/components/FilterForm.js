import React, { useState } from 'react';
import axios from 'axios';
import { TextField, MenuItem, Button, Grid, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FilterForm = ({ addFilter }) => {
  const [name, setName] = useState('');
  const [criteria, setCriteria] = useState([]);
  const [newCriteria, setNewCriteria] = useState({ type: 'Amount', condition: 'More', value: '' });

  const handleAddCriteria = () => {
    setCriteria([...criteria, { ...newCriteria }]);
    setNewCriteria({ type: 'Amount', condition: 'More', value: '' });
  };

  const handleCriteriaChange = (index, field, value) => {
    const newCriteriaList = criteria.map((c, i) =>
      i === index ? { ...c, [field]: value } : c
    );
    setCriteria(newCriteriaList);
  };

  const handleRemoveCriteria = (index) => {
    setCriteria(criteria.filter((_, i) => i !== index));
  };

  const validateCriteria = () => {
    for (let c of criteria) {
      if (!c.value || (c.type === 'Date' && !(c.value instanceof Date))) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (criteria.length === 0) {
      alert('A filter must contain at least one criteria.');
      return;
    }

    if (!validateCriteria()) {
      alert('Please fill in all the required values for each criterion.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/filters', { name, criteriaList: criteria });
      addFilter(response.data);
      setName('');
      setCriteria([]);
    } catch (error) {
      console.error('There was an error saving the filter!', error);
    }
  };

  return (
    <form id="filter-form" onSubmit={handleSubmit}>
      <TextField
        label="Filter Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        fullWidth
        margin="normal"
      />
      {criteria.map((c, index) => (
        <Grid container spacing={2} key={index} alignItems="center" marginBottom={2}>
          <Grid item xs={4}>
            <TextField
              select
              label="Type"
              value={c.type}
              onChange={(e) => handleCriteriaChange(index, 'type', e.target.value)}
              fullWidth
              variant="outlined"
            >
              <MenuItem value="Amount">Amount</MenuItem>
              <MenuItem value="Title">Title</MenuItem>
              <MenuItem value="Date">Date</MenuItem>
            </TextField>
          </Grid>
          {c.type === 'Amount' && (
            <>
              <Grid item xs={4}>
                <TextField
                  select
                  label="Condition"
                  value={c.condition}
                  onChange={(e) => handleCriteriaChange(index, 'condition', e.target.value)}
                  fullWidth
                  variant="outlined"
                >
                  <MenuItem value="More">More</MenuItem>
                  <MenuItem value="Less">Less</MenuItem>
                  <MenuItem value="Equal">Equal</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  type="number"
                  label="Value"
                  value={c.value}
                  onChange={(e) => handleCriteriaChange(index, 'value', e.target.value)}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
            </>
          )}
          {c.type === 'Title' && (
            <>
              <Grid item xs={4}>
                <TextField
                  select
                  label="Condition"
                  value={c.condition}
                  onChange={(e) => handleCriteriaChange(index, 'condition', e.target.value)}
                  fullWidth
                  variant="outlined"
                >
                  <MenuItem value="Contains">Contains</MenuItem>
                  <MenuItem value="StartsWith">Starts With</MenuItem>
                  <MenuItem value="EndsWith">Ends With</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  type="text"
                  label="Value"
                  value={c.value}
                  onChange={(e) => handleCriteriaChange(index, 'value', e.target.value)}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
            </>
          )}
          {c.type === 'Date' && (
            <>
              <Grid item xs={4}>
                <TextField
                  select
                  label="Condition"
                  value={c.condition}
                  onChange={(e) => handleCriteriaChange(index, 'condition', e.target.value)}
                  fullWidth
                  variant="outlined"
                >
                  <MenuItem value="Before">Before</MenuItem>
                  <MenuItem value="After">After</MenuItem>
                  <MenuItem value="On">On</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={8}>
                <DatePicker
                  selected={c.value instanceof Date ? c.value : null}
                  onChange={(date) => handleCriteriaChange(index, 'value', date)}
                  dateFormat="yyyy/MM/dd"
                  className="date-picker"
                  placeholderText="Select Date"
                />
              </Grid>
            </>
          )}
          <Grid item xs={12} container justifyContent="flex-end">
            <IconButton
              color="error"
              onClick={() => handleRemoveCriteria(index)}
              style={{ marginTop: '8px' }} // Add top margin for spacing
            >
              <DeleteIcon fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <Box marginY={2} textAlign="center">
        <Button variant="contained" color="primary" onClick={handleAddCriteria}>
          + Add Criteria
        </Button>
      </Box>
    </form>
  );
};

export default FilterForm;
