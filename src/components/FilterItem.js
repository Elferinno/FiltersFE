import React from 'react';

const FilterItem = ({ filter }) => {
  return (
    <div className="filter-item">
      <h4>{filter.name}</h4>
      {filter.criteriaList.map((criteria, idx) => (
        <div key={idx} className="criteria-item">
          <p><strong>Type:</strong> {criteria.type}</p>
          <p><strong>Condition:</strong> {criteria.condition}</p>
          <p><strong>Value:</strong> {criteria.value}</p>
        </div>
      ))}
    </div>
  );
};

export default FilterItem;
