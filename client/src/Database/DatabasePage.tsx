import React, { useState } from 'react';
import { Button } from '@mui/material';
import DataGrid from '../components/DataGrid';
import UploadModal from './UploadModal';

const styles = {
  main: {
    width: '90%',
    margin: 'auto',
  },
  button: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
};

export default function DatabasePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={styles.main}>
      <DataGrid />
      <Button
        variant="contained"
        color="primary"
        style={styles.button}
        onClick={handleButtonClick}
      >
        Import CSV to Database
      </Button>
      <UploadModal
        isModalOpen={isModalOpen}
        handleModalClose={handleModalClose}
      />
    </div>
  );
}
