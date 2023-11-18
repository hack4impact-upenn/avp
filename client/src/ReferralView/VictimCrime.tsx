/* eslint-disable */
import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Theme, useTheme } from '@mui/material/styles';
import { CheckCircleOutline, ErrorOutline } from '@material-ui/icons';
import { green } from '@mui/material/colors';
import { useParams } from 'react-router-dom';
import { putData } from '../util/api';
import { genderDropdown } from '../util/dropdown';

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

const crimeType = [
  'Assault',
  'Bullying',
  'Burglary',
  'Child Abuse/Neglect',
  'Family Violence',
  'Harassment',
  'Homicide',
  'Identity Theft/Fraud/Financial Crime',
  'Police Violence',
  'Robbery',
  'Stalking',
  'Theft',
  'Witnessing Violence (Youth Only)',
];

const policeDistrictOfCrime = [
  '1',
  '2',
  '3',
  '5',
  '6',
  '7',
  '8',
  '9',
  '12',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '22',
  '24',
  '25',
  '26',
  '35',
  '39',
  'Not Philadelphia',
];

export default function PageTwo({ referral, setReferral }: Props) {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [updateStatus, setUpdateStatus] = React.useState('');
  const theme = useTheme();
  const [data, setData] = useState(referral?.referral?.data);
  const [crimeDate, setCrimeDate] = React.useState<Dayjs | null>();
  const [homicideDate, sethomicideDate] = React.useState<Dayjs | null>();

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

  let homicideFields;
  if (data?.crimeType == 'Homicide') {
    homicideFields = (
      <div>
        <FormControl required sx={{ m: 1, minWidth: 420 }}>
          <TextField
            value={data?.homMNum}
            id="outlined-number"
            label="M#/S#/AID#"
            onChange={(event) =>
              setData({ ...data, homMNum: event.target.value })
            }
          />
        </FormControl>

        <FormControl sx={{ m: 1 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Date of Death"
              value={homicideDate}
              onChange={(newValue: Dayjs | null) => {
                sethomicideDate(newValue);
              }}
            />
          </LocalizationProvider>
        </FormControl>
      </div>
    );
  }

  return (
    <div>
      <FormControl required sx={{ m: 1, minWidth: 600 }}>
        <InputLabel id="demo-simple-select-label">
          Type Of Crime / Victimization
        </InputLabel>
        <Select
          value={data?.crimeType}
          labelId="demo-simple-select-label"
          id="demo-simple-select-label"
          label="Type Of Crime / Victimization"
          onChange={(event) =>
            setData({ ...data, crimeType: event.target.value as string })
          }
          required
        >
          {crimeType.map((val) => (
            <MenuItem
              key={val}
              value={val}
              style={getStyles(val, crimeType, theme)}
            >
              {val}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <br />

      <FormControl sx={{ m: 1 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Date of Incident"
            value={crimeDate}
            onChange={(newValue: Dayjs | null) => {
              setCrimeDate(newValue);
            }}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl required sx={{ m: 1, minWidth: 240 }}>
        <InputLabel id="demo-simple-select-label">Gun Violence?</InputLabel>
        <Select
          value={
            data?.isGunViolence
              ? 'Yes'
              : data?.isGunViolence === false
              ? 'No'
              : ''
          }
          labelId="demo-simple-select-label"
          id="demo-simple-select-label"
          label="Gun Violence?"
          onChange={(event) => {
            const val: string = event.target.value as string;
            setData({
              ...data,
              isGunViolence: val.includes('Yes')
                ? true
                : val.includes('No')
                ? false
                : null,
            });
          }}
        >
          <MenuItem value="Yes">Yes</MenuItem>
          <MenuItem value="No">No</MenuItem>
          <MenuItem value="Unknown">Unknown</MenuItem>
        </Select>
      </FormControl>

      <br />

      <FormControl required sx={{ m: 1, minWidth: 420 }}>
        <TextField
          value={data?.incidentAddressObj?.street}
          id="outlined-basic"
          label="Street Address of Incident"
          variant="outlined"
          onChange={(event) =>
            setData({
              ...data,
              incidentAddressObj: {
                ...(data?.incidentAddressObj || {}),
                street: event.target.value,
              },
            })
          }
        />
      </FormControl>

      <FormControl required sx={{ m: 1, minWidth: 240 }}>
        <TextField
          value={data?.incidentAddressObj?.zipcode}
          id="outlined-basic"
          label="Zip Code of Incident"
          variant="outlined"
          onChange={(event) =>
            setData({
              ...data,
              incidentAddressObj: {
                ...(data?.incidentAddressObj || {}),
                zipcode: event.target.value,
              },
            })
          }
        />
      </FormControl>

      <br />

      <FormControl required sx={{ m: 1, minWidth: 500 }}>
        <InputLabel id="demo-simple-select-label">Incident Reported to the Police?</InputLabel>
        <Select
          value={
            data?.reportedToPolice
              ? 'Yes'
              : data?.reportedToPolice === false
              ? 'No'
              : ''
          }
          labelId="demo-simple-select-label"
          id="demo-simple-select-label"
          label="Reported to Police?"
          onChange={(event) => {
            const val: string = event.target.value as string;
            setData({
              ...data,
              reportedToPolice: val.includes('Yes')
                ? true
                : val.includes('No')
                ? false
                : null,
            });
          }}
        >
          <MenuItem value="Yes">Yes</MenuItem>
          <MenuItem value="No">No</MenuItem>
          <MenuItem value="Unknown">Unknown</MenuItem>
        </Select>
      </FormControl>

      < br />

      <FormControl required sx={{ m: 1, minWidth: 360 }}>
        <TextField
          value={data?.crimeDCNum}
          id="outlined-number"
          label="Police Incident # (DC#)"
          type="number"
          onChange={(event) =>
            setData({ ...data, crimeDCNum: event.target.value })
          }
        />
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 420 }}>
        <InputLabel id="demo-simple-select-label">
          Police District of Incident
        </InputLabel>
        <Select
          value={data?.victimGender}
          labelId="demo-simple-select-label"
          id="demo-simple-select-label"
          label="Police District of Incident"
          onChange={(event) =>
            setData({ ...data, crimeDistrict: event.target.value as string })
          }
        >
          {policeDistrictOfCrime.map((val) => (
            <MenuItem
              key={val}
              value={val}
              style={getStyles(val, policeDistrictOfCrime, theme)}
            >
              {val}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl required sx={{ m: 1, minWidth: 420 }}>
        <TextField
          required
          value={data?.victimName}
          id="outlined-basic"
          label="Name of Victim"
          variant="outlined"
          onChange={(event) =>
            setData({
              ...data,
              victimName: event.target.value,
            })
          }
        />
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 420 }} required >
        <InputLabel id="demo-simple-select-label" required>
          Gender of Victim
        </InputLabel>
        <Select
          required
          value={data?.crimeDistrict}
          labelId="demo-simple-select-label"
          id="demo-simple-select-label"
          label="Gender of Victim"
          onChange={(event) =>
            setData({ ...data, victimGender: event.target.value as string })
          }
        >
          {genderDropdown.map((val) => (
            <MenuItem
              key={val}
              value={val}
              style={getStyles(val, genderDropdown, theme)}
            >
              {val}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {homicideFields}

      <br />

      {/* <FormControl required sx={{ m: 1, minWidth: 540 }}>
        <TextField
          id="outlined-number"
          label="How Many People Are Being Referred For This Victimization/Crime?"
          type="number"
          onChange={(event) =>
            setData({ ...data, noReferred: event.target.value })
          }
        />
      </FormControl> */}
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
