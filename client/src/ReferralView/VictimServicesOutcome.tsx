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
import { IVictimServicesOutcomeItem } from '../util/types/referral';
import { putData, useData } from '../util/api';

const victimServicesOutcomeBooleanFields = {
  eligibleForAVPVictimServices: 'Eligible For AVP Victim Services',
  sentVCAPInfotoClient: 'Sent VCAP Info to Client',
  avpAdvocateAssistingWithVCAP: 'AVP Advocate Assisting With VCAP',
  referredToOtherVSAgencyForVCAP: 'Referred to Other VS Agency for VCAP',
  avpAdvocateProvidingCourtSupport: 'AVP Advocate Providing Court Support',
  clientWorkingWithFMV: 'Client Working With FMV',
  referredToOtherAgencyForCourt: 'Referred to Other Agency for Court',
  avpAdvocateContactedADA: 'AVP Advocate Contacted ADA',
  avpAdvocateContactedDetective: 'AVP Advocate Contacted Detective',
  needsRelocationAssistance: 'Needs Relocation Assistance',
  relocationReferralWasSubmitted: 'Relocation Referral Was Submitted',
  referredToAgencyForOtherServices: 'Referred to Agency for Other Services',
};

const victimServicesOutcomeStringFields = {
  vsAgencyName: 'VS Agency Name',
  fmvNumber: 'FMV Number',
  courtSupportAgencyName: 'Court Support Agency Name',
  otherAgencyNames: 'Other Agency Names',
  otherServices: 'Other Services',
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
  eligibleForAVPVictimServices: boolean;
  sentVCAPInfotoClient: boolean;
  avpAdvocateAssistingWithVCAP: boolean;
  referredToOtherVSAgencyForVCAP: boolean;
  vsAgencyName: string;
  avpAdvocateProvidingCourtSupport: boolean;
  clientWorkingWithFMV: boolean;
  fmvNumber: boolean;
  referredToOtherAgencyForCourt: boolean;
  courtSupportAgencyName: string;
  avpAdvocateContactedADA: boolean;
  avpAdvocateContactedDetective: boolean;
  needsRelocationAssistance: boolean;
  relocationReferralWasSubmitted: boolean;
  referredToAgencyForOtherServices: boolean;
  otherAgencyNames: string;
  otherServices: string;
  additionalNotes: string;
}

export default function PageFive({ data, setData }: Props) {
  const { id } = useParams();
  const [victimServicesOutcome, setVictimServicesOutcome] =
    useState<IVictimServicesOutcomeItem>({
      eligibleForAVPVictimServices: false,
      sentVCAPInfotoClient: false,
      avpAdvocateAssistingWithVCAP: false,
      referredToOtherVSAgencyForVCAP: false,
      vsAgencyName: '',
      avpAdvocateProvidingCourtSupport: false,
      clientWorkingWithFMV: false,
      fmvNumber: false,
      referredToOtherAgencyForCourt: false,
      courtSupportAgencyName: '',
      avpAdvocateContactedADA: false,
      avpAdvocateContactedDetective: false,
      needsRelocationAssistance: false,
      relocationReferralWasSubmitted: false,
      referredToAgencyForOtherServices: false,
      otherAgencyNames: '',
      otherServices: '',
      additionalNotes: '',
    });

  const [loading, setLoading] = React.useState(false);
  const [updateStatus, setUpdateStatus] = React.useState('');

  useEffect(() => {
    setVictimServicesOutcome(data.data);
  }, [data]);

  const handleUpdate = async () => {
    setLoading(true);
    setUpdateStatus('');

    try {
      const body: Body = victimServicesOutcome;
      body.id = id;
      const response = await putData(
        `referral/${id}/victimServicesOutcome`,
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
        {Object.entries(victimServicesOutcomeBooleanFields).map(
          ([fieldName, formattedLabel]) => (
            <FormControlLabel
              key={fieldName}
              control={
                <Checkbox
                  name={fieldName}
                  checked={
                    !!victimServicesOutcome[
                      fieldName as keyof IVictimServicesOutcomeItem
                    ]
                  }
                  onChange={() =>
                    setVictimServicesOutcome((prevState) => ({
                      ...prevState,
                      [fieldName]:
                        !prevState[
                          fieldName as keyof IVictimServicesOutcomeItem
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
        {Object.entries(victimServicesOutcomeStringFields).map(
          ([fieldName, formattedLabel]) => (
            <TextField
              key={fieldName}
              name={fieldName}
              label={formattedLabel}
              value={
                victimServicesOutcome[
                  fieldName as keyof IVictimServicesOutcomeItem
                ] || ''
              }
              onChange={(e) =>
                setVictimServicesOutcome((prevState) => ({
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
