import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FilterForm = ({ addFilter }) => {
  const [name, setName] = useState('');
  const [criteriaType, setCriteriaType] = useState('Amount');
  const [condition, setCondition] = useState('');
  const [value, setValue] = useState('');
  const [criteriaList, setCriteriaList] = useState([]);

  const handleAddCriteria = () => {
    setCriteriaList([
      ...criteriaList,
      { type: criteriaType, condition, value }
    ]);
  };

  const handleCreateFilter = async () => {
    const newFilter = {
      name,
      criteriaList
    };

    try {
      const response = await axios.post('/api/filters', newFilter);
      addFilter(response.data);
      // Reset form
      setName('');
      setCriteriaList([]);
    } catch (error) {
      console.error('Error creating filter:', error);
    }
  };

  return (
    <div className="filter-form">
      <h3>Add New Filter</h3>
      <input
        type="text"
        placeholder="Filter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="criteria-section">
        <select
          value={criteriaType}
          onChange={(e) => setCriteriaType(e.target.value)}
        >
          <option value="Amount">Amount</option>
          <option value="Title">Title</option>
          <option value="Date">Date</option>
        </select>
        <input
          type="text"
          placeholder="Condition"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        />
        {criteriaType === 'Date' ? (
          <DatePicker
            selected={new Date(value)}
            onChange={(date) => setValue(date.toISOString())}
          />
        ) : (
          <input
            type="text"
            placeholder="Value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        )}
        <button onClick={handleAddCriteria}>Add Criteria</button>
      </div>
      <button onClick={handleCreateFilter}>Create Filter</button>
    </div>
  );
};

export default FilterForm;
