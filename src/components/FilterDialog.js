import React from 'react';
import { Modal, Box, Button, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FilterForm from './FilterForm';
import './FilterDialog.css';

const FilterDialog = ({ isOpen, onRequestClose, addFilter, isModal }) => {
  return isModal ? (
    <Modal open={isOpen} onClose={onRequestClose}>
      <Box className="filter-dialog" sx={{ resize: 'vertical', overflow: 'hidden' }}>
        <Box className="filter-dialog-header">
          <Typography variant="h6">Add Filter</Typography>
          <IconButton onClick={onRequestClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box className="filter-dialog-content">
          <FilterForm addFilter={addFilter} />
        </Box>
        <Box className="filter-dialog-buttons">
          <Button onClick={onRequestClose} variant="contained" color="secondary">
            Close
          </Button>
          <Button type="submit" form="filter-form" variant="contained" color="secondary">
            Submit Filter
          </Button>
        </Box>
      </Box>
    </Modal>
  ) : (
    <Box className="filter-dialog filter-dialog-non-modal">
      <Box className="filter-dialog-header">
        <Typography variant="h6">Add Filter</Typography>
      </Box>
      <FilterForm addFilter={addFilter} />
      <Box className="filter-dialog-buttons">
        <Button type="submit" form="filter-form" variant="contained" color="secondary">
          Submit Filter
        </Button>
      </Box>
    </Box>
  );
};

export default FilterDialog;
