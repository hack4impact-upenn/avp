import {
  FormControl,
  TextField,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import React from 'react';
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
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
}

export default function PageFour({ data, setData }: Props) {
  const theme = useTheme();

  return (
    <div>
      <div>
        <FormControl sx={{ m: 1, minWidth: 360 }}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Name of Staff Making Referral"
            onChange={(event) =>
              setData({ ...data, agencyRepName: event.target.value })
            }
          />
        </FormControl>
      </div>
      <div>
        <FormControl sx={{ m: 1, minWidth: 420 }}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Agency/Organizaton"
            onChange={(event) =>
              setData({ ...data, agencyThatReferred: event.target.value })
            }
          />
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 420 }}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Department"
            onChange={(event) =>
              setData({ ...data, agencyThatReferred: event.target.value })
            }
          />
        </FormControl>
      </div>
      <div>
        <FormControl required sx={{ m: 1, minWidth: 240 }}>
          <TextField
            id="outlined-number"
            label="Phone Number"
            type="number"
            onChange={(event) =>
              setData({ ...data, agencyRepPhone: event.target.value })
            }
          />
        </FormControl>
        <FormControl required sx={{ m: 1, minWidth: 360 }}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Email Address"
            onChange={(event) =>
              setData({ ...data, agencyRepEmail: event.target.value })
            }
          />
        </FormControl>
      </div>
    </div>
  );
}
