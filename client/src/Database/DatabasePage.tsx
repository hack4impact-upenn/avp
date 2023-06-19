import React from 'react';
import { Button } from '@mui/material';
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

export default function DatabasePage() {
  return (
    <div style={styles.main}>
      <DataGrid />
      <Button
        variant="contained"
        color="primary"
        style={styles.button}
        href="/form"
      >
        Add a Referral
      </Button>
    </div>
  );
}
