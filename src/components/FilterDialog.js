// src/components/FilterDialog.js
import React from 'react';
//import Modal from 'react-modal';
import FilterForm from './FilterForm';

import { Modal, Box, Button, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import './FilterDialog.css';

const FilterDialog = ({ isOpen, onRequestClose, addFilter, isModal }) => {
    return isModal ? (
      <Modal open={isOpen} onClose={onRequestClose}>
        <Box className="filter-dialog">
          <Box className="filter-dialog-header">
            <Typography variant="h6">Add Filter</Typography>
            <IconButton onClick={onRequestClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <FilterForm addFilter={addFilter} />
          <Button className="filter-dialog-close-button" onClick={onRequestClose} variant="contained" color="secondary">
            Close
          </Button>
        </Box>
      </Modal>
    ) : (
      <Box className="filter-dialog filter-dialog-non-modal">
        <Box className="filter-dialog-header">
          <Typography variant="h6">Add Filter</Typography>
          <IconButton onClick={onRequestClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <FilterForm addFilter={addFilter} />
        <Button className="filter-dialog-close-button" onClick={onRequestClose} variant="contained" color="secondary">
          Close
        </Button>
      </Box>
    );
  };
  
  export default FilterDialog;