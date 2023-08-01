import {
  FormControl,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Box,
} from '@mui/material';
import React, { useState } from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';

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
  const theme = useTheme();
  const [data, setData] = useState(referral?.referral?.data);

  return (
    <div>
      <Box component="form">
        <div>
          <FormControl required sx={{ m: 1, minWidth: 360 }}>
            <TextField
              value={data.agencyRepName}
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
              value={data.agencyThatReferred}
              id="outlined-basic"
              variant="outlined"
              label="Agency/Organizaton"
              required
              onChange={(event) =>
                setData({ ...data, agencyThatReferred: event.target.value })
              }
            />
          </FormControl>
          <FormControl required sx={{ m: 1, minWidth: 420 }}>
            <TextField
              value={data.departmentInCharge}
              id="outlined-basic"
              variant="outlined"
              label="Department"
              required
              onChange={(event) =>
                setData({ ...data, departmentInCharge: event.target.value })
              }
            />
          </FormControl>
        </div>
        <div>
          <FormControl required sx={{ m: 1, minWidth: 240 }}>
            <TextField
              value={data.agencyRepPhone}
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
              value={data.agencyRepEmail}
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
    </div>
  );
}
