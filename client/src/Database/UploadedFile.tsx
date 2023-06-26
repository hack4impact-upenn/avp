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
    }, 300);
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
              console.log(file);
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
        maxWidth: '100%',
        borderRadius: 1,
        backgroundColor: 'primary.main',
      }}
    >
      <Box
        sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
      >
        <ListItemText
          primaryTypographyProps={{ color: 'white' }}
          primary={file.name}
        />
        {progress !== 100 && (
          <Box sx={{ width: '100%' }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              color="inherit"
            />
          </Box>
        )}
      </Box>
    </ListItem>
  );
}
export default UploadedFile;
