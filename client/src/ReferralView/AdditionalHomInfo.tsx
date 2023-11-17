import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Box,
  Button,
  setRef,
  Grid,
  CircularProgress,
} from '@mui/material';
import { green } from '@mui/material/colors';
import { CheckCircleOutline, ErrorOutline } from '@material-ui/icons';
import React, { useState } from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useParams } from 'react-router-dom';
import { IReferral } from '../util/types/referral';
import { putData } from '../util/api';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { genderDropdown, raceDropdown } from '../util/dropdown';
import { trusted } from 'mongoose';

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

const homType = [
  'CA&N/IFH', 
'IFH',
'IFH/IPV',
'IPV',
'IPV-related',
'Justified killing',
'MVA',
'Police Shooting'
]

const homLocation = [
  'Indoor',
  'Outdoor',
  'Inside Car'
]

const homDecedentRace = raceDropdown;
const homDecedentSex = genderDropdown;

const stringFields = {
  homFMVNum: 'Homicide FMV#',
  homMEONum: 'Homicide MEO#',
  homMNum: 'Homicide M#',
  homCaseInformation: 'Homicide Case Information'
};

export default function AdditionalHomInfo({ referral, setReferral }: Props) {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [updateStatus, setUpdateStatus] = React.useState('');
  const theme = useTheme();
  console.log(referral);
  const [data, setData] = useState(referral?.referral?.data);
  // console.log('additional hom info data');
  // console.log(data);

  const handleChange = (event: any, field: keyof IReferral, isString=false) => {
    console.log(event, field, data);
    const {
      target: { value },
    } = event;
    if (isString) {
      setData({
        ...data,
        [field]: value
      });
    } else {
      setData({
        ...data,
        [field]: value.join(', ') as string,
      });
    }
    console.log(data);
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
      <FormControl
        sx={{ m: 1, width: 600 }}
      >
        <InputLabel id="demo-multiple-name-label">
          Homocide Type
        </InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={data?.homType ? data?.homType.split(', ') : []}
          onChange={(event) => {handleChange(event,'homType')}}
          input={<OutlinedInput label="Homicide Type" />}
          MenuProps={MenuProps}
          required
        >
          {homType.map((val) => (
            <MenuItem
              key={val}
              value={val}
              style={getStyles(val, homType, theme)}
            >
              {val}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br />
      <FormControl
        sx={{ m: 1, width: 600 }}
      >
        <InputLabel id="demo-multiple-name-label">
          Homocide Location
        </InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={data?.homLocation ? data?.homLocation.split(', ') : []}
          onChange={(event) => {handleChange(event,'homLocation')}}
          input={<OutlinedInput label="Homicide Location" />}
          MenuProps={MenuProps}
          required
        >
          {homLocation.map((val) => (
            <MenuItem
              key={val}
              value={val}
              style={getStyles(val, homLocation, theme)}
            >
              {val}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br />
      {/* <FormControl
        sx={{ m: 1, width: 600 }}
      >
        <InputLabel id="demo-multiple-name-label">
          Homocide Decedent Gender
        </InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={data?.homDecedentSex ? data?.homDecedentSex.split(', ') : []}
          onChange={(event) => {handleChange(event,'homDecedentSex')}}
          input={<OutlinedInput label="Homocide Decedent Gender" />}
          MenuProps={MenuProps}
          required
        >
          {homDecedentSex.map((val) => (
            <MenuItem
              key={val}
              value={val}
              style={getStyles(val, homDecedentSex, theme)}
            >
              {val}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br /> */}
      <FormControl
        sx={{ m: 1, width: 600 }}
      >
        <InputLabel id="demo-multiple-name-label">
          Homocide Decedent Race / Ethnicity
        </InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={data?.homDecedentRace ? data?.homDecedentRace.split(', ') : []}
          onChange={(event) => {handleChange(event,'homDecedentRace')}}
          input={<OutlinedInput label="Homocide Decedent Race / Ethnicity" />}
          MenuProps={MenuProps}
          required
        >
          {homDecedentRace.map((val) => (
            <MenuItem
              key={val}
              value={val}
              style={getStyles(val, homDecedentRace, theme)}
            >
              {val}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br />
      <Grid item xs={6}>
        {Object.entries(stringFields).map(
          ([fieldName, formattedLabel]) => (
            <TextField
              key={fieldName}
              name={fieldName}
              label={formattedLabel}
              value={
                data && fieldName in data? 
                data[
                  fieldName as keyof IReferral
                ] || '' : ''
              }
              onChange={(e) =>
                // setReferral((prevState) => ({
                //   ...prevState,
                //   [fieldName]: e.target.value,
                // }))
                handleChange(e, fieldName as keyof IReferral, true)
              }
              fullWidth
              margin="normal"
              sx={{ m: 1, width: 600 }}
            />
          ),
        )}
      </Grid>

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
