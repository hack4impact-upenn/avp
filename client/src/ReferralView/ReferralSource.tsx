import {
  FormControl,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Button,
  CircularProgress,
  Grid,
} from '@mui/material';
import React, { useState } from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import { CheckCircleOutline, ErrorOutline } from '@material-ui/icons';
import { green } from '@mui/material/colors';
import { useParams } from 'react-router-dom';
import { putData } from '../util/api';

function getStyles(val: string, valArr: string[], theme: Theme) {
  return {
    fontWeight:
      valArr.indexOf(val) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface Props {
  referral: any;
  setReferral: React.Dispatch<React.SetStateAction<any>>;
}

export default function PageFour({ referral, setReferral }: Props) {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [updateStatus, setUpdateStatus] = React.useState('');
  const theme = useTheme();
  const [data, setData] = useState(referral?.referral?.data);

  const handleUpdate = async () => {
    // setLoading(true);
    // setUpdateStatus('');

    try {
      const body = data;
      body.id = id;
      const response = await putData(`referral/${id}`, body);

      if (response.error === null) {
        console.log('post success');
        console.log(response);
        setReferral({ ...data, referral: response });
        setUpdateStatus('success');
      } else {
        console.log('post error');
        setUpdateStatus('error');
      }
    } catch (error) {
      setUpdateStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Box component="form">
        <div>
          <FormControl required sx={{ m: 1, minWidth: 360 }}>
            <TextField
              value={data?.agencyRepName}
              id="outlined-basic"
              variant="outlined"
              label="Name of Staff Making Referral"
              required
              onChange={(event) =>
                setData({ ...data, agencyRepName: event.target.value })
              }
            />
          </FormControl>
        </div>
        <div>
          <FormControl required sx={{ m: 1, minWidth: 420 }}>
            <TextField
              value={data?.agencyThatReferred}
              id="outlined-basic"
              variant="outlined"
              label="Agency/Organizaton"
              required
              onChange={(event) =>
                setData({ ...data, agencyThatReferred: event.target.value })
              }
            />
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 420 }}>
            <TextField
              value={data?.departmentInCharge}
              id="outlined-basic"
              variant="outlined"
              label="Department"
              onChange={(event) =>
                setData({ ...data, departmentInCharge: event.target.value })
              }
            />
          </FormControl>
        </div>
        <div>
          <FormControl required sx={{ m: 1, minWidth: 240 }}>
            <TextField
              value={data?.agencyRepPhone}
              id="outlined-number"
              label="Phone Number"
              type="number"
              required
              onChange={(event) =>
                setData({ ...data, agencyRepPhone: event.target.value })
              }
            />
          </FormControl>
          <FormControl required sx={{ m: 1, minWidth: 360 }}>
            <TextField
              value={data?.agencyRepEmail}
              id="outlined-basic"
              variant="outlined"
              label="Email Address"
              required
              onChange={(event) =>
                setData({ ...data, agencyRepEmail: event.target.value })
              }
            />
          </FormControl>
        </div>
      </Box>
      <Grid item xs={12} paddingTop={10}>
        <Grid container justifyContent="end">
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
    </div>
  );
}
