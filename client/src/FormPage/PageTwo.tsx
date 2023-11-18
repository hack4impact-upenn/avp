/* eslint-disable */
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Theme, useTheme } from '@mui/material/styles';
import IReferral from '../util/types/referral';
import { ChangeEvent } from 'react';

function getStyles(val: string, valArr: string[], theme: Theme) {
  return {
    fontWeight:
      valArr.indexOf(val) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface Props {
  data: IReferral;
  setData: React.Dispatch<React.SetStateAction<IReferral>>;
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
  'Mass Violence'
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

export default function PageTwo({ data, setData }: Props) {
  const theme = useTheme();
  const [crimeDate, setCrimeDate] = React.useState<Dayjs | null>();
  const [homicideDate, sethomicideDate] = React.useState<Dayjs | null>();

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
          value={data?.crimeDistrict}
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
    </div>
  );
}
