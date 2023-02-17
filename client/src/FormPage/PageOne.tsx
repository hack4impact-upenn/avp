import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React from 'react';

interface Props {
  data: any;
  setData: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageOne({ data, setData }: Props) {
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={data.age}
          label="Counseling & Therapy"
          onChange={(event) => setData({ ...data, age: event.target.value })}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
