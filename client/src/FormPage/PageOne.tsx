import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';

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
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
}

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
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

  return (
    <div>
      <FormControl sx={{ m: 1, width: 600 }}>
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
        >
          {names.map((val) => (
            <MenuItem
              key={val}
              value={val}
              style={getStyles(val, names, theme)}
            >
              {val}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br />
      <FormControl sx={{ m: 1, width: 600 }}>
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
        >
          {names.map((val) => (
            <MenuItem
              key={val}
              value={val}
              style={getStyles(val, names, theme)}
            >
              {val}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
