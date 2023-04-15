import {
  FormControl,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';

const sections: any = {
  VCAP: [
    'Sent VCAP Info to Client',
    'AVP advocate assisting with VCAP',
    'Referred to other victim service agency for VCAP',
  ],
  'Court Support': [
    'AVP advocate providing court support',
    'Client working with FMV already',
  ],
  'Case Status': [
    'AVP advocate contacted ADA',
    'AVP advocate contacted detective',
  ],
  Relocation: [
    'Needs relocation assistance',
    'A relocation referral was submitted',
  ],
  'Counseling Services': [
    'Receiving crisis counseling',
    'Scheduled individual therapy intake appointment',
    'Receiving individual therapy',
    'Added to individual therapy waitlist',
    'Sent support group information',
    'Added to support group waitlist',
    'Added to support group',
  ],
  'Youth Services': [
    'Assigned to YVO therapist',
    'YVO therapist name',
    'Assigned to YVO group',
    'YVO Group therapist name',
    'Assigned to YVO group waitlist',
    'Assigned to YVO individual therapy waitlist',
  ],
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

export default function PageFive({ data, setData }: Props) {
  const theme = useTheme();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      }}
    >
      {Object.keys(sections).map((k) => (
        <div style={{ width: '32%' }}>
          <Typography
            sx={{ margin: '12px 0px', fontWeight: 'bold', fontSize: '18px' }}
            color="primary"
          >
            {k}
          </Typography>
          {sections[k].map((item: any) => (
            <FormControl
              sx={{ marginBottom: 2, marginRight: 2, minWidth: 360 }}
            >
              <InputLabel id={`${item}`}>{item}</InputLabel>
              <Select
                labelId={`${item}`}
                value={data[item]}
                onChange={(event) =>
                  setData({ ...data, [item]: event.target.value })
                }
                label={item}
              >
                <MenuItem value={1}>Yes</MenuItem>
                <MenuItem value={0}>No</MenuItem>
              </Select>
            </FormControl>
          ))}
        </div>
      ))}
    </div>
  );
}
