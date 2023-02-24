import React from 'react';
import DataGrid from '../components/DataGrid';

const styles = {
  main: {
    width: '90%',
    margin: 'auto',
  },
};

export default function DatabasePage() {
  return (
    <div style={styles.main}>
      <DataGrid />
    </div>
  );
}
