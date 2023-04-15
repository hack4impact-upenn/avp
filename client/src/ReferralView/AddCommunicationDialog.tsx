import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';

interface AddCommunicationDialogProps {
  open: boolean;
  handleClose: any;
  handleSubmit: any;
}

export default function AddCommunicationDialog({
  open,
  handleClose,
  handleSubmit,
}: AddCommunicationDialogProps) {
  const emp = {
    title: '',
    description: '',
    name: '',
    hasResponded: false,
  };
  const [data, setData] = useState(emp);
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ margin: 0, '& h2': { margin: 0 } }}>
        Add New History
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          type="title"
          fullWidth
          variant="standard"
          value={data.title}
          onChange={(event) => setData({ ...data, title: event.target.value })}
        />
        <TextField
          autoFocus
          margin="dense"
          id="description"
          label="Description"
          type="description"
          fullWidth
          variant="standard"
          value={data.description}
          onChange={(event) =>
            setData({ ...data, description: event.target.value })
          }
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="name"
          fullWidth
          variant="standard"
          value={data.name}
          onChange={(event) => setData({ ...data, name: event.target.value })}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '80%',
            alignItems: 'center',
            marginTop: '10px',
          }}
        >
          <DialogContentText>Has responded?</DialogContentText>
          <Checkbox
            value={data.hasResponded}
            onChange={() =>
              setData({ ...data, hasResponded: !data.hasResponded })
            }
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleClose();
            setData(emp);
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            handleSubmit(data);
            setData(emp);
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
