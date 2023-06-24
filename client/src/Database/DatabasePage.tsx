import React, { useState } from 'react';
import { Button, Modal, Box, Typography } from '@mui/material';
import DataGrid from '../components/DataGrid';

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

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: '1rem',
  width: '400px',
  maxHeight: '80vh',
  overflowY: 'auto',
  textAlign: 'center',
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
      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
