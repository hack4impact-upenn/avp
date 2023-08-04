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
import { ICounsellingServicesOutcomeItem } from '../util/types/referral';
import { putData, useData } from '../util/api';

const counsellingServicesOutcomeBooleanFields = {
  eligibleForAVPCounsellingServices: 'Eligible For AVP Counselling Services',
  receivingCrisisCounselling: 'Receiving Crisis Counselling',
  scheduledIntakeApptForIndividualTherapy:
    'Scheduled Intake Appt for Individual Therapy',
  intakeAppointmentOutcome: 'Intake Appointment Outcome',
  receivingIndividualTherapy: 'Receiving Individual Therapy',
  addedToIndividualTherapyWaitlist: 'Added to Individual Therapy Waitlist',
  referredForCounsellingServices: 'Referred for Counselling Services',
  counselingAgency: 'Counselling Agency',
  sentAVPSupportGroupInfo: 'Sent AVP Support Group Info',
  attendingSupportGroup: 'Attending Support Group',
  addedToSupportGroupWaitlist: 'Added to Support Group Waitlist',
};

const counsellingServicesOutcomeStringFields = {
  therapistName: 'Therapist Name',
  supportGroupName: 'Support Group Name',
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
  eligibleForAVPCounsellingServices: boolean;
  receivingCrisisCounselling: boolean;
  scheduledIntakeApptForIndividualTherapy: boolean;
  intakeAppointmentOutcome: boolean;
  receivingIndividualTherapy: boolean;
  therapistName: string;
  addedToIndividualTherapyWaitlist: boolean;
  referredForCounsellingServices: boolean;
  counsellingAgency: boolean;
  sentAVPSupportGroupInfo: boolean;
  attendingSupportGroup: boolean;
  supportGroupName: string;
  addedToSupportGroupWaitlist: boolean;
  additionalNotes: string;
}

export default function PageFive({ data, setData }: Props) {
  const { id } = useParams();
  const [counsellingServicesOutcome, setCounsellingServicesOutcome] =
    useState<ICounsellingServicesOutcomeItem>({
      eligibleForAVPCounsellingServices: false,
      receivingCrisisCounselling: false,
      scheduledIntakeApptForIndividualTherapy: false,
      intakeAppointmentOutcome: false,
      receivingIndividualTherapy: false,
      therapistName: '',
      addedToIndividualTherapyWaitlist: false,
      referredForCounsellingServices: false,
      counsellingAgency: false,
      sentAVPSupportGroupInfo: false,
      attendingSupportGroup: false,
      supportGroupName: '',
      addedToSupportGroupWaitlist: false,
      additionalNotes: '',
    });

  const [loading, setLoading] = React.useState(false);
  const [updateStatus, setUpdateStatus] = React.useState('');

  // useEffect(() => {
  //   setCounsellingServicesOutcome(data.data);
  // }, [data]);
  useEffect(() => {
    const outcomeObj = data?.referral?.data?.counsellingServicesOutcome;
    console.log(data);
    if (outcomeObj) setCounsellingServicesOutcome(outcomeObj);
  }, [data]);

  const handleUpdate = async () => {
    setLoading(true);
    setUpdateStatus('');

    try {
      const body: Body = counsellingServicesOutcome;
      body.id = id;
      const response = await putData(
        `referral/${id}/counsellingServicesOutcome`,
        body,
      );

      if (response.error === null) {
        console.log('successfully post counseling outcome');
        setData({ ...data, referral: response });
        setUpdateStatus('success');
      } else {
        console.log('fail to post youth outcome');
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
        {Object.entries(counsellingServicesOutcomeBooleanFields).map(
          ([fieldName, formattedLabel]) => (
            <FormControlLabel
              key={fieldName}
              control={
                <Checkbox
                  name={fieldName}
                  checked={
                    !!counsellingServicesOutcome[
                      fieldName as keyof ICounsellingServicesOutcomeItem
                    ]
                  }
                  onChange={() =>
                    setCounsellingServicesOutcome((prevState) => ({
                      ...prevState,
                      [fieldName]:
                        !prevState[
                          fieldName as keyof ICounsellingServicesOutcomeItem
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
        {Object.entries(counsellingServicesOutcomeStringFields).map(
          ([fieldName, formattedLabel]) => (
            <TextField
              key={fieldName}
              name={fieldName}
              label={formattedLabel}
              value={
                counsellingServicesOutcome[
                  fieldName as keyof ICounsellingServicesOutcomeItem
                ] || ''
              }
              onChange={(e) =>
                setCounsellingServicesOutcome((prevState) => ({
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
