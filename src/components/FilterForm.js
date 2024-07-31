// src/components/FilterForm.js
import axios from 'axios';
import React, { useState } from 'react';
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
    const newCriteriaList = criteria.map((c, i) => (
      i === index ? { ...c, [field]: value } : c
    ));
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
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Filter Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        required 
      />
      {criteria.map((c, index) => (
        <div key={index} className="criteria-item">
          <select value={c.type} onChange={(e) => handleCriteriaChange(index, 'type', e.target.value)}>
            <option value="Amount">Amount</option>
            <option value="Title">Title</option>
            <option value="Date">Date</option>
          </select>
          {c.type === 'Amount' && (
            <>
              <select value={c.condition} onChange={(e) => handleCriteriaChange(index, 'condition', e.target.value)}>
                <option value="More">More</option>
                <option value="Less">Less</option>
                <option value="Equal">Equal</option>
              </select>
              <input 
                type="number" 
                value={c.value} 
                onChange={(e) => handleCriteriaChange(index, 'value', e.target.value)} 
                required 
              />
            </>
          )}
          {c.type === 'Title' && (
            <>
              <select value={c.condition} onChange={(e) => handleCriteriaChange(index, 'condition', e.target.value)}>
                <option value="Contains">Contains</option>
                <option value="StartsWith">Starts With</option>
                <option value="EndsWith">Ends With</option>
              </select>
              <input 
                type="text" 
                value={c.value} 
                onChange={(e) => handleCriteriaChange(index, 'value', e.target.value)} 
                required 
              />
            </>
          )}
          {c.type === 'Date' && (
            <>
              <select value={c.condition} onChange={(e) => handleCriteriaChange(index, 'condition', e.target.value)}>
                <option value="Before">Before</option>
                <option value="After">After</option>
                <option value="On">On</option>
              </select>
              <DatePicker 
                selected={c.value instanceof Date ? c.value : null} 
                onChange={(date) => handleCriteriaChange(index, 'value', date)} 
                dateFormat="yyyy/MM/dd"
                required
              />
            </>
          )}
          <button type="button" onClick={() => handleRemoveCriteria(index)}>-</button>
        </div>
      ))}
      <button type="button" onClick={handleAddCriteria}>+ Add Criteria</button>
      <button type="submit">Submit Filter</button>
    </form>
  );
};

export default FilterForm;
