/* eslint-disable import/no-named-as-default */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-useless-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-undef */
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { SxProps } from '@mui/system';
import {
  DataGridPremium,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
  useGridApiContext,
} from '@mui/x-data-grid-premium';
import React, { useEffect, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import LoopIcon from '@mui/icons-material/Loop';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HourglassTopOutlinedIcon from '@mui/icons-material/HourglassTopOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import NoAccountsOutlinedIcon from '@mui/icons-material/NoAccountsOutlined';
import dayjs from 'dayjs';
import axios from 'axios';
import IReferral from '../util/types/referral';
import { ReferralDB, referralDbGrammar } from '../util/db/type';
import { getData, putData, URLPREFIX, useData } from '../util/api';

const dataGridContainerStyles: SxProps = {
  height: 700,
  width: '82vw',
};

const getReferralProperties = () => {
  return Object.keys(referralDbGrammar);
};

const processGrammar = (properties: string[]) => {
  return properties.map((property) => {
    const result = property.replace(/([A-Z])/g, ' $1');
    let final = result.charAt(0).toUpperCase() + result.slice(1);

    // Fix Home keyword
    if (final.includes('Hom')) {
      final = final.replace('Hom', 'Homicide');
    }

    if (final.includes('Num')) {
      final = final.replace('Num', 'Number');
    }

    if (final.includes('D C')) {
      final = final.replace('D C', 'DC');
    }

    if (final.includes('F M V')) {
      final = final.replace('F M V', 'FMV');
    }

    if (final.includes('M E O')) {
      final = final.replace('M E O', 'MEO');
    }

    if (final.includes('E T O')) {
      final = final.replace('E T O', 'ETO');
    }

    if (final.includes('C C')) {
      final = final.replace('C C', 'CC');
    }

    // Fix id key word
    if (final === '_id') {
      final = 'ID';
    }

    if (final.includes('Rep ')) {
      final = final.replace('Rep', 'Representative');
    }

    if (final.includes('D O B')) {
      final = final.replace('D O B', 'DOB');
    }

    if (final.includes('Obj')) {
      final = final.replace('Obj', '');
    }

    return final;
  });
};

interface CellProps {
  params: GridRenderCellParams<ReferralDB>;
}

// eslint-disable-next-line react/function-component-definition
const ViewReferralButton: React.FC<CellProps> = ({ params }) => {
  return (
    <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
      <Button
        variant="contained"
        size="small"
        style={{ margin: 'auto', background: '#4EA0B3', height: '26px' }}
        tabIndex={params.hasFocus ? 0 : -1}
        href={`/referral/${params.row.id}`}
      >
        View
      </Button>
    </div>
  );
};

// eslint-disable-next-line no-multi-assign, react/function-component-definition
const StatusCell: React.FC<CellProps> = ({ params }) => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Chip
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          height: '28px',
        }}
        variant="outlined"
        color={
          params.row.status === 'Assigned'
            ? 'success'
            : params.row.status === 'In progress'
            ? 'secondary'
            : params.row.status === 'Completed'
            ? 'success'
            : params.row.status === 'Transferred to ETO'
            ? 'secondary'
            : params.row.status === 'CC Waitlist'
            ? 'secondary'
            : params.row.status === 'Outreach Letter Sent'
            ? 'secondary'
            : params.row.status === 'Follow-up Letter Sent'
            ? 'secondary'
            : 'error'
        }
        icon={
          params.row.status === 'Assigned' ? (
            <AccountCircleOutlinedIcon sx={{ fontSize: '22px' }} />
          ) : params.row.status === 'Unassigned' ? (
            <NoAccountsOutlinedIcon sx={{ fontSize: '22px' }} />
          ) : params.row.status === 'In progress' ? (
            <LoopIcon sx={{ fontSize: '22px' }} />
          ) : params.row.status === 'Completed' ? (
            <CheckIcon sx={{ fontSize: '22px' }} />
          ) : params.row.status === 'Transferred to ETO' ? (
            <CheckIcon sx={{ fontSize: '22px' }} />
          ) : params.row.status === 'CC Waitlist' ? (
            <HourglassTopOutlinedIcon sx={{ fontSize: '22px' }} />
          ) : params.row.status === 'Outreach Letter Sent' ? (
            <MailOutlineIcon sx={{ fontSize: '22px' }} />
          ) : params.row.status === 'Follow-up Letter Sent' ? (
            <MailOutlineIcon sx={{ fontSize: '22px' }} />
          ) : (
            <ErrorOutlineIcon sx={{ fontSize: '22px' }} />
          )
        }
        label={
          params.row.status
            ? params.row.status.charAt(0).toUpperCase() +
              params.row.status.slice(1)
            : 'Unassigned'
        }
      />
    </div>
  );
};

const departmentOptions = [
  'Counseling Services',
  'Victim/Witness Services',
  'Youth Services',
];

function CustomEditComponent(props) {
  const { id, value, field } = props;

  const apiRef = useGridApiContext();

  const handleChange = (event) => {
    const eventValue = event.target.value; // The new value entered by the user
    const newValue =
      typeof eventValue === 'string' ? value.split(',') : eventValue;
    apiRef.current.setEditCellValue({
      id,
      field,
      value: newValue.filter((x) => x !== ''),
    });
  };

  return (
    <Select
      labelId="demo-multiple-name-label"
      id="demo-multiple-name"
      multiple
      value={value}
      onChange={handleChange}
      sx={{ width: '100%' }}
    >
      {departmentOptions.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  );
}
function CustomDepartmentEditCell(params) {
  return <CustomEditComponent {...params} />;
}

function CustomFilterInputSingleSelect(props) {
  const { item, applyValue, type, apiRef, focusElementRef, ...others } = props;

  return (
    <TextField
      id={`contains-input-${item.id}`}
      value={item.value}
      onChange={(event) => applyValue({ ...item, value: event.target.value })}
      type={type || 'text'}
      variant="standard"
      InputLabelProps={{
        shrink: true,
      }}
      inputRef={focusElementRef}
      select
      SelectProps={{
        native: true,
      }}
    >
      {['', ...departmentOptions].map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </TextField>
  );
}

const handleFileUpload = async (event: any, id: string, urlSuffix: string) => {
  const file = event.target.files[0];
  const url = `${URLPREFIX}/referral/${id}/${urlSuffix}`;

  // Perform additional checks/validation if needed
  if (true) {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('File uploaded successfully!', response);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  } else {
    console.log(`succeded! file name is ${file}`);
  }
};

const handleFileDelete = async (id: string, urlSuffix: string) => {
  const url = `${URLPREFIX}/referral/${id}/${urlSuffix}`;
  try {
    const response = await axios.delete(url, {
      responseType: 'blob',
    });
    const res = await getData('referral/all');
  } catch (error) {
    console.error('Error downloading file:', error);
  }
};

const handleFileGet = async (
  key: string,
  name: string,
  type: string,
  fileKey: string,
) => {
  try {
    const response = await axios.get(
      `${URLPREFIX}/referral/${fileKey}/${key}`,
      {
        responseType: 'blob',
      },
    );
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${name}`); // or any other extension
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.error('Error downloading file:', error);
  }
};

function UploadCell(props) {
  const { params, fileKey, fileProperty, trigger } = props;

  return (
    <div style={{ width: '100%', display: 'flex', alignItems: 'start' }}>
      {params.row[fileProperty] ? (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Button
            variant="contained"
            onClick={() => {
              handleFileGet(
                params.row[fileProperty].id,
                params.row[fileProperty].name,
                params.row[fileProperty].type,
                fileKey,
              );
              trigger();
            }}
            component="label"
            size="small"
            style={{
              margin: 'auto',
              background: '#4EA0B3',
              height: '26px',
              marginRight: '20px',
            }}
            tabIndex={params.hasFocus ? 0 : -1}
          >
            get
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleFileDelete(params.row._id, fileKey);
              trigger();
            }}
            component="label"
            size="small"
            style={{
              margin: 'auto',
              height: '26px',
            }}
            tabIndex={params.hasFocus ? 0 : -1}
          >
            delete
          </Button>
        </div>
      ) : (
        <div>
          <Button
            variant="contained"
            component="label"
            size="small"
            style={{
              margin: 'auto',
              background: '#4EA0B3',
              height: '26px',
            }}
            tabIndex={params.hasFocus ? 0 : -1}
          >
            Upload
            <input
              type="file"
              hidden
              onChange={(e) => {
                handleFileUpload(e, params.row._id, fileKey);
                trigger();
              }}
            />
          </Button>
        </div>
      )}
    </div>
  );
}

export default function DataGridNew() {
  const [referralList, setReferralList] = useState<ReferralDB[]>([]);
  const users = useData('admin/all');
  const [userList, setUserList] = useState<object[]>([]);

  const getAllReferrals = async () => {
    const { data: referrals } = await getData('referral/all');
    let departmentInCharge;
    const finalReferrals = referrals.map((referral: ReferralDB) => {
      if (referral.departmentInCharge === undefined) {
        departmentInCharge = [];
      } else if (referral.departmentInCharge.includes(',')) {
        departmentInCharge = referral.departmentInCharge.split(',');
      } else {
        departmentInCharge = [referral.departmentInCharge];
      }
      return {
        ...referral,
        id: referral._id,
        departmentInCharge,
      } as ReferralDB;
    });
    setReferralList(finalReferrals);
  };

  const getColumns = () => {
    const grammar = processGrammar(getReferralProperties());
    const properties = getReferralProperties();

    let columns: GridColDef<ReferralDB>[] = grammar.map((title, index) => {
      const result: GridColDef<ReferralDB> = {
        field: properties[index],
        headerName: title,
        width: title.length * 10 + 20,
        minWidth: 200,
        editable: true,
      };

      if (title === 'Status') {
        result.type = 'singleSelect';
        result.valueOptions = [
          'Assigned',
          'Unassigned',
          'In progress',
          '1st unsuccessful attempt',
          '2nd unsuccessful attempt',
          '3rd unsuccessful attempt',
          'Completed',
          'Transferred to ETO',
          'CC Waitlist',
          'Outreach Letter Sent',
          'Follow-up Letter Sent',
        ];
        result.renderCell = (params) => <StatusCell params={params} />;
      }

      if (title === 'Department In Charge') {
        result.valueOptions = departmentOptions;
        result.valueFormatter = ({ value }) => (value ? value.join(', ') : '');
        result.renderEditCell = CustomDepartmentEditCell;
        result.filterOperators = [
          {
            value: 'contains',
            getApplyFilterFn: (filterItem) => {
              if (filterItem.value == null || filterItem.value === '') {
                return null;
              }
              return ({ value }) => {
                // if one of the cell values corresponds to the filter item
                return value.some(
                  (cellValue) => cellValue === filterItem.value,
                );
              };
            },
            InputComponent: CustomFilterInputSingleSelect,
          },
        ];
      }

      if (title.includes('Date') || title.includes('DOB')) {
        result.type = 'date';
        result.valueFormatter = (params) =>
          dayjs(params.value).format('DD/MM/YYYY');
      }

      if (
        title.includes('Is') ||
        title.includes('Sent') ||
        title.includes('Transferred') ||
        title.includes('Reported')
      ) {
        result.type = 'boolean';
      }

      if (title.includes('File')) {
        let fileKey;
        if (title.includes('Referral')) {
          fileKey = 'referralPDF';
        } else if (title.includes('Follow Up')) {
          fileKey = 'followUpPDF';
        } else if (title.includes('Out Reach')) {
          fileKey = 'outreachPDF';
        }

        console.log(fileKey);

        result.renderCell = (params) => (
          <UploadCell
            params={params}
            fileKey={fileKey}
            fileProperty={properties[index]}
            trigger={getAllReferrals}
          />
        );
      }

      if (title.includes('Address')) {
        const addressProp = properties[index];
        result.valueGetter = (params) => {
          let address: string[] = [];
          if (params.row[addressProp]) {
            if (params.row[addressProp].street) {
              address.push(params.row[addressProp].street as string);
            }
          } else {
            address = ['Unknown'];
          }
        };
      }

      if (title.includes('Program')) {
        result.type = 'singleSelect';
        result.valueOptions = [
          'Families of Murder Victims',
          'West/Southwest Victim Services',
          'Counseling Center',
          'Partners in Care',
          'Youth Violence Outreach',
        ];
      }

      if (title.includes('Gender') || title.includes('Sex')) {
        result.type = 'singleSelect';
        result.valueOptions = [
          'Female (woman/girl)',
          'Male (man/body)',
          'Non-binary/non-conforming',
          'Transgender',
          'Gender-fluid',
          'Unknown',
          'Other',
        ];
      }

      //   if (title === 'Staff Assigned') {
      //     result.type = 'singleSelect';
      //     result.valueOptions = [
      //       'Amina Erwin',
      //       'Ciera Moore',
      //       'Gabrielle Rainey',
      //       'Lisa Christian',
      //       'Lorenzo Shedrick',
      //       'Pamela Diaz',
      //       'Priscilla Rivera',
      //     ];
      //   }

      // TODO: Make things work here
      if (title === 'Staff Assigned') {
        result.type = 'singleSelect';
        result.valueOptions = userList;
        const userProperty = properties[index];
        result.valueFormatter = (params) => {
          if (params.value) {
            if (params.value.firstName && params.value.lastName) {
              return `${params.value.firstName} ${params.value.lastName}`;
            }
            return '';
          }
          return '';
        };
        result.valueGetter = (option) => {
          return option.value;
        };
        result.getOptionLabel = (value) =>
          `${value.firstName} ${value.lastName}`;
        result.getOptionValue = (value) => {
          return value;
        };
        result.valueSetter = (params) => {
          console.log(params.row);
          return params.row;
        };
      }

      if (title.includes('Race') || title.includes('Ethnicity')) {
        result.type = 'singleSelect';
        result.valueOptions = [
          'American Indian or Alaska Native',
          'Asian',
          'African American or Black',
          'Hispanic or Latinx',
          'Native Hawaiian or Other Pacific Islander',
          'White',
          'Other',
          'Unknown',
        ];
      }

      return result;
    });

    // Special fields
    const viewReferralCol: GridColDef<ReferralDB> = {
      field: 'view-referral-button',
      headerName: 'View Referral',
      align: 'center',
      renderCell: (params) => <ViewReferralButton params={params} />,
    };

    columns = [...columns, viewReferralCol];

    return columns;
  };

  const columns = getColumns();

  const removeLicense = setInterval(() => {
    if (
      typeof document.getElementsByClassName('MuiDataGrid-main')[0] ===
      'undefined'
    )
      return;
    clearInterval(removeLicense);
    if (document.getElementsByClassName('MuiDataGrid-main')[0].childNodes[2]) {
      document
        .getElementsByClassName('MuiDataGrid-main')[0]
        .childNodes[2].remove();
    }
  }, 10);

  useEffect(() => {
    getAllReferrals();
  }, []);

  useEffect(() => {
    if (users) {
      console.log(users);
      setUserList(users.data);
    }
  }, [users]);

  if (referralList.length === 0) {
    return (
      <div style={{ width: '0', margin: 'auto' }}>
        <CircularProgress size={80} />
      </div>
    );
  }

  const processRowUpdate = (newRow, _) => {
    const updatedData: ReferralDB = {
      ...newRow,
      departmentInCharge: newRow.departmentInCharge.join(', '),
    };

    console.log(updatedData);

    const properties = getReferralProperties();

    properties.map((property) => {
      if (updatedData[property] === undefined) {
        updatedData[property] = null;
      }
      return;
    });

    putData(`referral/${newRow.id}`, updatedData).then(() => {
      getAllReferrals();
    });

    return newRow;
  };

  return (
    <Box sx={dataGridContainerStyles}>
      <DataGridPremium
        columns={columns}
        rows={referralList}
        rowHeight={42}
        processRowUpdate={processRowUpdate}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        components={{ Toolbar: GridToolbar }}
        initialState={{
          columns: { columnVisibilityModel: { id: false } },
          pinnedColumns: {
            left: ['survivorName'],
            right: ['view-referral-button'],
          },
        }}
      />
    </Box>
  );
}
