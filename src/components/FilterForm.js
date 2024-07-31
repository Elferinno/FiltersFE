import axios from 'axios';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FilterForm = ({ addFilter }) => {
  const [name, setName] = useState('');  // Add name state
  const [criteria, setCriteria] = useState([]);
  const [newCriteria, setNewCriteria] = useState({ type: 'Amount', condition: 'More', value: '' });

  const handleAddCriteria = () => {
    setCriteria([...criteria, newCriteria]);
    setNewCriteria({ type: 'Amount', condition: 'More', value: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/filters', { name, criteriaList: criteria });
      addFilter(response.data);
      setName('');  // Reset name
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
      <button type="button" onClick={handleAddCriteria}>+ Add Criteria</button>
      {criteria.map((c, index) => (
        <div key={index}>
          <span>{c.type} - {c.condition} - {c.value}</span>
        </div>
      ))}
      <div>
        <select value={newCriteria.type} onChange={(e) => setNewCriteria({ ...newCriteria, type: e.target.value })}>
          <option value="Amount">Amount</option>
          <option value="Title">Title</option>
          <option value="Date">Date</option>
        </select>
        {newCriteria.type === 'Amount' && (
          <>
            <select value={newCriteria.condition} onChange={(e) => setNewCriteria({ ...newCriteria, condition: e.target.value })}>
              <option value="More">More</option>
              <option value="Less">Less</option>
              <option value="Equal">Equal</option>
            </select>
            <input type="number" value={newCriteria.value} onChange={(e) => setNewCriteria({ ...newCriteria, value: e.target.value })} />
          </>
        )}
        {newCriteria.type === 'Title' && (
          <>
            <select value={newCriteria.condition} onChange={(e) => setNewCriteria({ ...newCriteria, condition: e.target.value })}>
              <option value="Contains">Contains</option>
              <option value="StartsWith">Starts With</option>
              <option value="EndsWith">Ends With</option>
            </select>
            <input type="text" value={newCriteria.value} onChange={(e) => setNewCriteria({ ...newCriteria, value: e.target.value })} />
          </>
        )}
        {newCriteria.type === 'Date' && (
          <>
            <select value={newCriteria.condition} onChange={(e) => setNewCriteria({ ...newCriteria, condition: e.target.value })}>
              <option value="Before">Before</option>
              <option value="After">After</option>
              <option value="On">On</option>
            </select>
            <DatePicker selected={newCriteria.value} onChange={(date) => setNewCriteria({ ...newCriteria, value: date })} />
          </>
        )}
      </div>
      <button type="submit">Submit Filter</button>
    </form>
  );
};

export default FilterForm;
