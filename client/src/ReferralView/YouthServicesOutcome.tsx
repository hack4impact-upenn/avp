import {
  Container,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  CircularProgress,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import { green } from '@material-ui/core/colors';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Params, useParams } from 'react-router-dom';
import axios from 'axios';
import { array } from 'prop-types';
import { CheckCircleOutline, ErrorOutline } from '@material-ui/icons';
import { IYouthServicesOutcomeItem } from '../util/types/referral';
import { putData, useData } from '../util/api';

const youthServicesOutcomeBooleanFields = {
  eligibleForYVOServices: 'Eligible For YVO Services',
  assignedToYVOTherapist: 'Assigned to YVO Therapist',
  addedToYVOIndividualTherapyWaitlist:
    'Added to YVO Individual Therapy Waitlist',
  assignedToYVOGroup: 'Assigned to YVO Group',
  addedToYVOGroupWaitlist: 'Added to YVO Group Waitlist',
};

const youthServicesOutcomeStringFields = {
  yvoStaffName: 'YVO Staff Name',
  additionalNotes: 'Additional Notes',
};

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
  // id: Readonly<Params<string>>
}

interface Body {
  id?: string;
  eligibleForYVOServices: boolean;
  assignedToYVOTherapist: boolean;
  yvoStaffName: string;
  addedToYVOIndividualTherapyWaitlist: boolean;
  assignedToYVOGroup: boolean;
  addedToYVOGroupWaitlist: boolean;
  additionalNotes: string;
}

export default function PageFive({ data, setData }: Props) {
  const { id } = useParams();
  const [youthServicesOutcome, setYouthServicesOutcome] =
    useState<IYouthServicesOutcomeItem>({
      eligibleForYVOServices: false,
      assignedToYVOTherapist: false,
      yvoStaffName: '',
      addedToYVOIndividualTherapyWaitlist: false,
      assignedToYVOGroup: false,
      addedToYVOGroupWaitlist: false,
      additionalNotes: '',
    });

  const [loading, setLoading] = React.useState(false);
  const [updateStatus, setUpdateStatus] = React.useState('');

  useEffect(() => {
    const outcomeObj = data?.youthServicesOutcome;
    console.log(data);
    if (outcomeObj) setYouthServicesOutcome(outcomeObj);
  }, [data]);

  const handleUpdate = async () => {
    setLoading(true);
    setUpdateStatus('');

    try {
      const body: Body = youthServicesOutcome;
      body.id = id;
      const response = await putData(
        `referral/${id}/youthServicesOutcome`,
        body,
      );

      if (response.error === null) {
        setUpdateStatus('success');
      } else {
        setUpdateStatus('error');
      }
    } catch (error) {
      setUpdateStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const theme = useTheme();
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        {Object.entries(youthServicesOutcomeBooleanFields).map(
          ([fieldName, formattedLabel]) => (
            <FormControlLabel
              key={fieldName}
              control={
                <Checkbox
                  name={fieldName}
                  checked={
                    !!youthServicesOutcome[
                      fieldName as keyof IYouthServicesOutcomeItem
                    ]
                  }
                  onChange={() =>
                    setYouthServicesOutcome((prevState) => ({
                      ...prevState,
                      [fieldName]:
                        !prevState[
                          fieldName as keyof IYouthServicesOutcomeItem
                        ],
                    }))
                  }
                />
              }
              label={formattedLabel}
            />
          ),
        )}
      </Grid>
      <Grid item xs={6}>
        {Object.entries(youthServicesOutcomeStringFields).map(
          ([fieldName, formattedLabel]) => (
            <TextField
              key={fieldName}
              name={fieldName}
              label={formattedLabel}
              value={
                youthServicesOutcome[
                  fieldName as keyof IYouthServicesOutcomeItem
                ] || ''
              }
              onChange={(e) =>
                setYouthServicesOutcome((prevState) => ({
                  ...prevState,
                  [fieldName]: e.target.value,
                }))
              }
              fullWidth
              margin="normal"
            />
          ),
        )}
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="center">
          {
            // eslint-disable-next-line no-nested-ternary
            loading ? (
              <CircularProgress />
            ) : // eslint-disable-next-line no-nested-ternary
            updateStatus === 'success' ? (
              <CheckCircleOutline style={{ color: green[500] }} />
            ) : updateStatus === 'error' ? (
              <ErrorOutline color="error" />
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdate}
              >
                Update
              </Button>
            )
          }
        </Grid>
      </Grid>
    </Grid>
  );
}
