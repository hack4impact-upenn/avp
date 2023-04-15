import {
  FormControl,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Chip,
  Button,
} from '@mui/material';
import React, { useState } from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@mui/lab';
import IndividualTimeline from './IndividualTimeline';
import AddCommunicationDialog from './AddCommunicationDialog';

function getStyles(val: string, valArr: string[], theme: Theme) {
  return {
    fontWeight:
      valArr.indexOf(val) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface Props {
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
}

export default function PageSix({ data, setData }: Props) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [historyItems, setHistoryItems] = useState([
    {
      date: '01/22/2023',
      title: 'Email',
      description: 'Contacted person through email',
      personName: 'Bach Tran',
      respondStatus: false,
    },
    {
      date: '01/24/2023',
      title: 'Person responded',
      description: 'Person wants to meet through zoom',
      personName: 'Anjalee',
      respondStatus: true,
    },
    {
      date: '02/02/2023',
      title: 'To Do',
      description: 'Do something by this date',
      personName: 'Bach Tran',
      respondStatus: true,
    },
  ]);

  return (
    <div>
      <div style={{ overflow: 'scroll', height: '75vh', marginBottom: '5px' }}>
        <Timeline sx={{ color: '#4EA0B3' }} position="alternate">
          {historyItems.map((item) => (
            <TimelineItem sx={{ color: '#4EA0B3' }}>
              <TimelineOppositeContent sx={{ color: 'rgba(0,0,0,0.7)' }}>
                {item.date}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot
                  variant="outlined"
                  sx={{ borderColor: '#4EA0B3' }}
                />
                <TimelineConnector sx={{ background: '#4EA0B3' }} />
              </TimelineSeparator>
              <TimelineContent>
                <IndividualTimeline
                  title={item.title}
                  description={item.description}
                  personName={item.personName}
                  respondStatus={item.respondStatus}
                />
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
      <div
        style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}
      >
        <Button
          onClick={() => setOpen(true)}
          sx={{ textTransform: 'none' }}
          variant="contained"
        >
          Add new communication history
        </Button>
      </div>
      <AddCommunicationDialog
        open={open}
        handleClose={() => setOpen(false)}
        handleSubmit={(info: any) => {
          historyItems.push({
            date: new Date().toLocaleDateString(),
            title: info.title,
            description: info.description,
            personName: info.name,
            respondStatus: info.hasResponded,
          });
          setOpen(false);
        }}
      />
    </div>
  );
}
