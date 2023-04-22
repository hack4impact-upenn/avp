import {
  FormControl,
  TextField,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useParams } from 'react-router-dom';
import { useData } from '../util/api';
import { IReferral } from '../util/types/referral';

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
  referral: IReferral | null;
}

export default function PageFour({ data, setData, referral }: Props) {
  const { id } = useParams();
  const theme = useTheme();
  console.log(data);
  return (
    <div>
      <div>
        <FormControl sx={{ marginBottom: 2, marginRight: 2, minWidth: 360 }}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Name of Staff Making Referral"
            // value={data?.agencyRepName}
            // onChange={(event) => {
            //   const newAgencyRepName = event.target.value;
            //   setData({
            //     referral: {
            //       ...referral,
            //       agencyRepName: newAgencyRepName,
            //     },
            //   });
            // }}
            onChange={(event) =>
              setData({ ...data, agencyThatReferred: event.target.value })
            }
          />
        </FormControl>
      </div>
      <div>
        <FormControl sx={{ marginBottom: 2, marginRight: 2, minWidth: 420 }}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Agency/Organizaton"
            value={referral?.agencyThatReferred}
            onChange={(event) =>
              setData({ ...data, agencyThatReferred: event.target.value })
            }
          />
        </FormControl>
        <FormControl sx={{ marginBottom: 2, marginRight: 2, minWidth: 420 }}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Department"
            value={referral?.departmentInCharge}
            onChange={(event) =>
              setData({ ...data, agencyThatReferred: event.target.value })
            }
          />
        </FormControl>
      </div>
      <div>
        <FormControl
          required
          sx={{ marginBottom: 2, marginRight: 2, minWidth: 240 }}
        >
          <TextField
            id="outlined-number"
            label="Phone Number"
            type="number"
            value={referral?.agencyRepPhone}
            onChange={(event) =>
              setData({ ...data, agencyRepPhone: event.target.value })
            }
          />
        </FormControl>
        <FormControl
          required
          sx={{ marginBottom: 2, marginRight: 2, minWidth: 360 }}
        >
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Email Address"
            value={referral?.agencyRepEmail}
            onChange={(event) =>
              setData({ ...data, agencyRepEmail: event.target.value })
            }
          />
        </FormControl>
      </div>
    </div>
  );
}
