import React, { useState, useCallback } from 'react';
import { Modal, Box, List, Button } from '@mui/material';
import DropZone from './DropZone';
import UploadedFile from './UploadedFile';
import upload from './api';

interface UploadModalProps {
  isModalOpen: boolean;
  handleModalClose: () => void;
}

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

function UploadModal({ isModalOpen, handleModalClose }: UploadModalProps) {
  const [files, setFiles] = useState<File[]>([]);

  const handleSubmit = async () => {
    const res = files.map((file) => {
      return upload(file);
    });
    const results = await Promise.all(res);
    console.log(results);
    const newFiles = files.filter((file, index) => {
      return results[index] !== 'Created';
    });
    setFiles(newFiles);
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles([...files, ...acceptedFiles]);
    },
    [files],
  );

  const removeFile = (file: File) => {
    console.log(file);
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    console.log(newFiles);
    setFiles(newFiles);
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <DropZone onDrop={onDrop} />
        <List>
          {files.map((file) => (
            <UploadedFile key={file.name} file={file} removeFile={removeFile} />
          ))}
        </List>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          sx={{ marginTop: '1rem', marginBottom: '1rem' }}
        >
          Upload File
        </Button>
      </Box>
    </Modal>
  );
}

export default UploadModal;
