/* eslint-disable react/jsx-props-no-spreading */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useCallback } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useDropzone } from 'react-dropzone';
import { Paper, Typography } from '@mui/material';
import COLORS from '../assets/colors';

interface DropZoneProps {
  onDrop: (acceptedFiles: File[]) => void;
}
function DropZone({ onDrop }: DropZoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <Paper
      {...getRootProps()}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px dashed',
        borderColor: 'primary.main',
        borderRadius: 1,
        backgroundColor: 'background.paper',
        color: 'text.secondary',
        p: 2,
        width: '100%',
        '&:hover': {
          backgroundColor: COLORS.lightGray,
        },
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <Typography variant="h6">Drop the files here ...</Typography>
      ) : (
        <Typography variant="h6">
          Drag and drop files here, or click to select files
        </Typography>
      )}
    </Paper>
  );
}
export default DropZone;
