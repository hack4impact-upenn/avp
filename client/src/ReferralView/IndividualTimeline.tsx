import { Chip } from '@mui/material';
import React from 'react';

interface IndividualTimelineProps {
  title: string;
  description: string;
  personName: string;
  respondStatus: boolean;
}

export default function IndividualTimeline({
  title,
  description,
  personName,
  respondStatus,
}: IndividualTimelineProps) {
  return (
    <div style={{ color: 'black' }}>
      <p style={{ margin: 0, fontWeight: 'bold', fontSize: '18px' }}>{title}</p>
      <p style={{ margin: 0, fontSize: '15px' }}>{description}</p>
      <div style={{ marginTop: '7px' }}>
        <Chip
          variant="outlined"
          label={personName}
          sx={{
            borderColor: '#4EA0B3',
            color: '#4EA0B3',
            height: '30px',
          }}
        />
        <Chip
          variant="outlined"
          label={
            respondStatus ? 'Person has responded' : 'Person has not responded'
          }
          sx={
            respondStatus
              ? {
                  borderColor: 'green',
                  color: 'green',
                  marginLeft: '5px',
                  height: '30px',
                }
              : {
                  borderColor: 'red',
                  color: 'red',
                  marginLeft: '5px',
                  height: '30px',
                }
          }
        />
      </div>
    </div>
  );
}
