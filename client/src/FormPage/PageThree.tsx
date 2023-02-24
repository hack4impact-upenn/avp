import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
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

export default function PageThree({ data, setData }: Props) {
  const theme = useTheme();

  return <div />;
}
