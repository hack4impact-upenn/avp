import React, { useEffect, useState } from 'react';
import {
  Box,
  ListItem,
  IconButton,
  ListItemText,
  LinearProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface UploadedFileProps {
  file: File;
  removeFile: (file: File) => void;
}
function UploadedFile({ file, removeFile }: UploadedFileProps) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 200);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <ListItem
      alignItems="flex-start"
      secondaryAction={
        progress === 100 && (
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => {
              removeFile(file);
            }}
          >
            <CloseIcon />
          </IconButton>
        )
      }
      sx={{
        py: '7px',
        pl: '15px',
        pr: '10px',
        mb: '10px',
        borderRadius: '10px',
        borderColor: 'primary.main',
        border: '1px solid',
        backgroundColor: 'background.paper',
      }}
    >
      <Box
        sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
      >
        <ListItemText primary={file.name} />
        {progress !== 100 && (
          <Box sx={{ width: '100%' }}>
            <LinearProgress variant="determinate" value={progress} />
          </Box>
        )}
      </Box>
    </ListItem>
  );
}
export default UploadedFile;
