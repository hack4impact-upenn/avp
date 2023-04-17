import {
  FormControl,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Chip,
  Button,
  CircularProgress,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
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
import { useParams } from 'react-router-dom';
import IndividualTimeline from './IndividualTimeline';
import AddCommunicationDialog from './AddCommunicationDialog';
import { ICommunicationItem } from '../util/types/referral';
import { postData, useData } from '../util/api';
import IUser from '../util/types/user';

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
  const { id } = useParams();
  const [historyItems, setHistoryItems] = useState<ICommunicationItem[]>([]);
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const communications = useData(`referral/${id}/communication/all`);
  console.log(communications);
  useEffect(() => {
    // clean communications and put in communication list
    setHistoryItems(
      communications?.data?.map((comm: ICommunicationItem) => {
        console.log(comm);
        return comm;
      }),
    );
  }, [communications]);
  if (!historyItems) {
    return (
      <div style={{ width: '0', margin: 'auto' }}>
        <CircularProgress size={80} />
      </div>
    );
  }
  if (historyItems?.length > 0) {
    return (
      <div>
        <div
          style={{ overflow: 'scroll', height: '75vh', marginBottom: '5px' }}
        >
          <Timeline sx={{ color: '#4EA0B3' }} position="alternate">
            {historyItems.map((item) => (
              <TimelineItem sx={{ color: '#4EA0B3' }}>
                <TimelineOppositeContent sx={{ color: 'rgba(0,0,0,0.7)' }}>
                  {item.dateOfCommunication.toLocaleString()}
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
                    title={item.method}
                    description={item.notes ? item.notes : ''}
                    personName={item.user?.firstName}
                    respondStatus={item.didEstablishedContact}
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
          handleSubmit={async (info: any) => {
            const reqBody = {
              dateOfCommunication: new Date().toLocaleDateString(),
              method: info.title,
              notes: info.description,
              didEstablishedContact: info.hasResponded,
              dateOfNextCommunication: new Date(
                Date.now() + 7 * 24 * 60 * 60 * 1000,
              ).toLocaleDateString(),
            };
            console.log(reqBody);
            postData(`referral/${id}/communication`, reqBody).then((res) => {
              if (res.error) {
                throw Error(res.error.message);
              } else {
                const referral = res.data;
                historyItems.push(
                  referral.historyOfCommunication[
                    referral.historyOfCommunication.length - 1
                  ],
                );
                console.log('Successfully pushed!');
                console.log(historyItems);
                setOpen(false);
              }
            });
            setOpen(false);
          }}
        />
      </div>
    );
  }
  return (
    <div>
      <div key="no-communications">
        <p>There have been no communications.</p>
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
        handleSubmit={async (info: any) => {
          const reqBody = {
            dateOfCommunication: new Date().toLocaleDateString(),
            method: info.title,
            notes: info.description,
            didEstablishedContact: info.hasResponded,
            dateOfNextCommunication: new Date(
              Date.now() + 7 * 24 * 60 * 60 * 1000,
            ).toLocaleDateString(),
          };
          console.log(reqBody);
          postData(`referral/${id}/communication`, reqBody).then((res) => {
            if (res.error) {
              throw Error(res.error.message);
            } else {
              const referral = res.data;
              historyItems.push(
                referral.historyOfCommunication[
                  referral.historyOfCommunication.length - 1
                ],
              );
              console.log('Successfully pushed!');
              console.log(historyItems);
              setOpen(false);
            }
          });
          setOpen(false);
        }}
      />
    </div>
  );
}
