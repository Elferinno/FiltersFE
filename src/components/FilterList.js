import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FilterList = () => {
  const [filters, setFilters] = useState([]);

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

  return (
    <div>
      <h2>Saved Filters</h2>
      {filters.map((filter, index) => (
        <div key={filter.id}>
          <h3>Filter {index + 1}</h3>
          {filter.criteriaList.map((criteria, i) => (
            <p key={i}>{criteria.type} - {criteria.condition} - {criteria.value}</p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FilterList;
