import React from 'react';
import FilterItem from './FilterItem';

const FilterList = ({ filters }) => {
  return (
    <div className="filter-list">
      <h3>Existing Filters</h3>
      {filters.length > 0 ? (
        filters.map((filter, index) => (
          <FilterItem key={index} filter={filter} />
        ))
      ) : (
        <p>No filters available.</p>
      )}
    </div>
  );
};

export default FilterList;
