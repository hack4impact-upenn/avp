import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
} from '@mui/material';
import React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { IReferral } from '../util/types/referral';

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
  data: IReferral;
  setData: React.Dispatch<React.SetStateAction<IReferral>>;
}

const counselingServices = [
  'Individual Counseling/Therapy (In-Person)',
  'Individual Counseling/Therapy (Virtual)',
  'Adult Group Counseling/Therapy (In-Person)',
  'Adult Group Counseling/Therapy (Virtual)',
  'Youth Group Counseling/Therapy (In-Person)',
];

const victimServices = [
  'Court Support',
  'Detective Updates',
  'Victims Compensation Assistance Program (VCAP)',
  'Other: Specify Below',
];
export default function PageOne({ data, setData }: Props) {
  const theme = useTheme();
  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setData({
      ...data,
      serviceRequested: value.join(', '),
    });
  };

  const handleChangeVictim = (event: any) => {
    const {
      target: { value },
    } = event;
    setData({
      ...data,
      serviceRequestedVictim: value.join(', '),
    });
  };

  let otherVictimServices;
  if (
    data.serviceRequestedVictim &&
    data.serviceRequestedVictim.indexOf('Other') >= 0
  ) {
    otherVictimServices = (
      <div>
        <FormControl required sx={{ m: 1, minWidth: 600 }}>
          <TextField
            value={data.otherServiceRequestedVictim}
            id="outlined-basic"
            variant="outlined"
            label="Please Specify Other Requested Victim Services"
            required
            onChange={(event) =>
              setData({
                ...data,
                otherServiceRequestedVictim: event.target.value,
              })
            }
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
            value={data.date}
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
          data.serviceRequestedVictim.length < 1 ||
          data.serviceRequested.length > 0
        }
      >
        <InputLabel id="demo-multiple-name-label">
          Counseling & Therapy
        </InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={data.serviceRequested ? data.serviceRequested.split(', ') : []}
          onChange={handleChange}
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
          data.serviceRequested.length < 1 ||
          data.serviceRequestedVictim.length > 0
        }
      >
        <InputLabel id="demo-multiple-name-label">Victim Services</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={
            data.serviceRequestedVictim
              ? data.serviceRequestedVictim.split(', ')
              : []
          }
          onChange={handleChangeVictim}
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
    </div>
  );
}
