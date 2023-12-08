import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  Grid,
  CircularProgress,
} from '@mui/material';
import { green } from '@mui/material/colors';
import { CheckCircleOutline, ErrorOutline } from '@material-ui/icons';
import React, { useState } from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useParams } from 'react-router-dom';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { IReferral } from '../util/types/referral';
import { putData } from '../util/api';
import { handleFormChange } from '../util/dropdown';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
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
  referral: any;
  setReferral: React.Dispatch<React.SetStateAction<any>>;
}

const counselingServices = [
  'Individual Counseling/Therapy In-Person',
  'Individual Counseling/Therapy Virtual',
  'Adult Group Counseling/Therapy In-Person',
  'Adult Group Counseling/Therapy Virtual',
  'Youth Group Counseling/Therapy In-Person',
];

const victimServices = [
  'Court Support',
  'Detective Updates',
  'Victims Compensation Assistance Program (VCAP)',
  'Other: Specify Below',
];

export default function PageOne({ referral, setReferral }: Props) {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [updateStatus, setUpdateStatus] = React.useState('');
  const theme = useTheme();
  console.log(referral);
  const [data, setData] = useState(referral?.referral?.data);
  console.log('page one data');
  console.log(data);

  const handleChange = (
    event: any,
    field: keyof IReferral,
    isString = false,
  ) => {
    handleFormChange(data, setData, event, field, isString);
  };

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

  let otherVictimServices;
  if (
    data?.serviceRequestedVictim &&
    data?.serviceRequestedVictim.indexOf('Other') >= 0
  ) {
    otherVictimServices = (
      <div>
        <FormControl required sx={{ m: 1, minWidth: 600 }}>
          <TextField
            value={data?.otherServiceRequestedVictim}
            id="outlined-basic"
            variant="outlined"
            label="Please Specify Other Requested Victim Services"
            required
            onChange={(event) => {
              handleChange(event, 'otherServiceRequestedVictim', true);
            }}
          />
        </FormControl>
      </div>
    );
  }

  return (
    <div>
      {/* <FormControl style={{ marginBottom: '30px' }} sx={{ m: 1, width: 600 }}>
        <InputLabel id="demo-multiple-name-label">
          Outreach Letter File Upload
        </InputLabel>
        <Button
          variant="contained"
          component="label"
          size="small"
          style={{
            margin: 'auto',
            background: '#4EA0B3',
            height: '26px',
          }}
        >
          Upload
          <input type="file" hidden />
        </Button>
      </FormControl> */}
      {/* <br />
      <FormControl style={{ marginBottom: '30px' }} sx={{ m: 1, width: 600 }}>
        <InputLabel id="demo-multiple-name-label">
          Follow-Up Letter Sent
        </InputLabel>
        <Button
          variant="contained"
          component="label"
          size="small"
          style={{ margin: 'auto', background: '#4EA0B3', height: '26px' }}
        >
          Upload
          <input type="file" hidden />
        </Button>
      </FormControl>
      <br /> */}
      <FormControl required sx={{ m: 1 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Date"
            value={data?.date}
            onChange={(newValue: Dayjs | null) => {
              setData({
                ...data,
                date: newValue,
              });
            }}
          />
        </LocalizationProvider>
      </FormControl>
      <br />
      <FormControl
        sx={{ m: 1, width: 600 }}
        required={
          data?.serviceRequestedVictim?.length < 1 ||
          data?.serviceRequested?.length > 0
        }
      >
        <InputLabel id="demo-multiple-name-label">
          Counseling & Therapy
        </InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={
            data?.serviceRequested ? data?.serviceRequested.split(', ') : []
          }
          onChange={(event) => {
            handleChange(event, 'serviceRequested');
          }}
          input={<OutlinedInput label="Counseling & Therapy" />}
          MenuProps={MenuProps}
          required
        >
          {counselingServices.map((val) => (
            <MenuItem
              key={val}
              value={val}
              style={getStyles(val, counselingServices, theme)}
            >
              {val}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br />
      <FormControl
        sx={{ m: 1, width: 600 }}
        required={
          data?.serviceRequested?.length < 1 ||
          data?.serviceRequestedVictim?.length > 0
        }
      >
        <InputLabel id="demo-multiple-name-label">Victim Services</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={
            data?.serviceRequestedVictim
              ? data?.serviceRequestedVictim.split(', ')
              : []
          }
          onChange={(event) => {
            handleChange(event, 'serviceRequestedVictim');
          }}
          input={<OutlinedInput label="Victim Services" />}
          MenuProps={MenuProps}
          required
        >
          {victimServices.map((val) => (
            <MenuItem
              key={val}
              value={val}
              style={getStyles(val, victimServices, theme)}
            >
              {val}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br />
      <FormControl style={{ marginBottom: '30px' }} sx={{ m: 1, width: 400 }}>
        <InputLabel
          style={{ marginBottom: '30px' }}
          id="demo-multiple-name-label"
        >
          Referral PDF
        </InputLabel>
        <Button
          variant="contained"
          component="label"
          size="small"
          style={{
            margin: 'auto',
            background: '#4EA0B3',
            height: '26px',
            marginTop: '10px',
            padding: '15px 10px',
          }}
        >
          Upload
          <input type="file" hidden />
        </Button>
      </FormControl>

      {/* otherVictimServices */}
      {otherVictimServices}

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
