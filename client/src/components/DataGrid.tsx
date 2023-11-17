/* eslint-disable */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';

import {
  DataGridPremium,
  GridToolbar,
  useGridApiRef,
  useGridApiContext,
  GridRowId,
  GridFilterOperator,
  GridCellEditStopParams,
  GridCellEditStopReasons,
  MuiEvent,
} from '@mui/x-data-grid-premium';
import { Button, Chip, MenuItem, Select, TextField } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import LoopIcon from '@mui/icons-material/Loop';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import HourglassTopOutlinedIcon from '@mui/icons-material/HourglassTopOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { GridRenderCellParams } from '@mui/x-data-grid-pro';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import NoAccountsOutlinedIcon from '@mui/icons-material/NoAccountsOutlined';
import { URLPREFIX, useDataFlexible, getData, putData } from '../util/api';
import IReferral from '../util/types/referral';
import CircularProgress from '@mui/material/CircularProgress';
import { GlobalProps } from '../util/types/generic';
import dayjs from 'dayjs';

/* Wrapper Around DataGridPremium */
export default function DataGrid({ globalProps, setGlobalProps }: GlobalProps) {
  const [referralList, setReferralList] = useState<IReferral[]>([]);
  const { data: referrals, setData: setReferrals } =
    useDataFlexible('referral/all');
  const emptyStringArray: string[] = [''];

  /* For saving datagrid state */
  //Todo: edit backend to actually save and retrieve userProfile
  // const userProfile = {
  //   id: 'user123', // unique identifier for the user
  //   name: 'John Doe', // user's name
  //   email: 'john.doe@example.com', // user's email
  //   columnState: { // user's saved column state
  //     order: ['id', 'name', 'email', 'address', 'phone'], // order of columns
  //     visibility: { // visibility of columns
  //       'id': true,
  //       'name': true,
  //       'email': false, // user has hidden the email column
  //       'address': true,
  //       'phone': true,
  //     },
  //   },
  // ... other user profile properties
  // }
  // const [columnState, setColumnState] = useState(null);

  // useEffect(() => {
  //   // Fetch user's column state from profile and set it to state
  //   const userColumnState = userProfile.columnState;
  //   setColumnState(userColumnState);
  // }, [userProfile]);

  // const handleColumnOrderChange = (newColumnOrder) => {
  //   // Update state
  //   setColumnState({
  //     ...columnState,
  //     order: newColumnOrder,
  //   });
  //   // Update user profile
  //   updateUserProfile({
  //     ...userProfile,
  //     columnState: {
  //       ...userProfile.columnState,
  //       order: newColumnOrder,
  //     }
  //   });
  ////////////////////////////////

  function CustomEditComponent(props: {
    api: any;
    id: GridRowId;
    value?: string;
    field: string;
    valueOptions: string[];
  }) {
    const { id, value, field } = props;
    const apiRef = useGridApiContext();

    const handleChange = (event: any) => {
      const eventValue = event.target.value; // The new value entered by the user
      console.log({ eventValue });
      const newValue = Array.isArray(eventValue) ? eventValue : [eventValue];
      apiRef.current.setEditCellValue({
        id,
        field,
        value: String(newValue.filter((x: any) => x !== '')),
      });
    };

    return (
      <Select
        labelId="demo-multiple-name-label"
        id="demo-multiple-name"
        multiple
        value={
          value && typeof value === 'string'
            ? value.split(',')
            : !value
            ? emptyStringArray
            : value
        }
        onChange={handleChange}
        sx={{ width: '100%' }}
      >
        {props.valueOptions.map((option: any) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    );
  }

  const handleFileUpload = async (
    event: any,
    id: string,
    urlSuffix: string,
  ) => {
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
        const res = await getData('referral/all');
        setReferrals(res);
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
      setReferrals(res);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handleFileGet = async (key: string, name: string, type: string) => {
    try {
      const response = await axios.get(
        `${URLPREFIX}/referral/referralPDF/${key}`,
        {
          responseType: 'blob',
        },
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${name}`); //or any other extension
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  function CustomFilterInputSingleSelect(props: any) {
    const {
      item,
      applyValue,
      type,
      apiRef,
      focusElementRef,
      valueOptions,
      ...others
    } = props;

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
        {['', ...valueOptions].map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </TextField>
    );
  }

  const filterOperatorsArray: GridFilterOperator = {
    value: 'contains',
    getApplyFilterFn: (filterItem: any) => {
      if (filterItem.value == null || filterItem.value === '') {
        return null;
      }
      return ({ value }: any) => {
        // if one of the cell values corresponds to the filter item
        return value.some((cellValue: any) => cellValue === filterItem.value);
      };
    },
    InputComponent: CustomFilterInputSingleSelect,
    InputComponentProps: { type: 'text' },
  };
  useEffect(() => {
    console.log(referrals)
    setReferralList(
      referrals?.data?.map((referral: IReferral) => {
        referral.id = referral._id;
        if (referral.staffAssigned != null) {
          referral.staffName =
            referral.staffAssigned.firstName +
            ' ' +
            referral.staffAssigned.lastName;
        }
        // console.log(referral);
        return referral;
      }),
    );
  }, [referrals]);

  const apiRef = useGridApiRef();
  const columns = [
    { field: 'id', headerName: 'ID', width: 30 },
    //Todo: make department multiselect
    {
      field: 'departmentInCharge',
      headerName: 'Department in Charge',
      width: 210,
      editable: true,
      type: 'singleSelect',
      valueFormatter: ({ value }) =>
        Array.isArray(value) ? value.join(', ') : '',
      renderEditCell: (params) => (
        <CustomEditComponent
          valueOptions={[
            'Counseling Services',
            'Victim/Witness Services',
            'Youth Services',
          ]}
          {...params}
        />
      ),
      filterOperators: [filterOperatorsArray],
    },
    {
      field: 'program',
      headerName: 'Program',
      width: 150,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Program 1', 'Program 2', 'Program 3'],
    },
    {
      field: 'staffName',
      headerName: 'Staff',
      width: 160,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Staff 1', 'Staff 2', 'Staff 3'],
    },
    {
      field: 'therapistAssigned',
      headerName: 'Therapist',
      type: 'singleSelect',
      valueOptions: ['Therapist 1', 'Therapist 2', 'Therapist 3'],
      width: 160,
      editable: true,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      editable: true,
      type: 'singleSelect',
      valueOptions: [
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
      ],
      renderCell: (params: GridRenderCellParams<Date>) => (
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
      ),
    },
    {
      field: 'transferredToETO',
      headerName: 'Added to ETO',
      width: 120,
      type: 'boolean',
      editable: true,
    },
    {
      field: 'view',
      headerName: 'View Referral',
      width: 140,
      align: 'center',
      renderCell: (params: GridRenderCellParams<Date>) => (
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
      ),
    },
    {
      field: 'lastDate',
      headerName: 'Last Reached Out',
      width: 170,
      editable: true,
      type: 'date',
      valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY'),
    },
    {
      field: 'method',
      headerName: 'Method of Last Communication',
      width: 170,
      editable: true,
      type: 'singleSelect',
      valueOptions: [
        'Called & left voicemail',
        'Called & talked to client',
        'E-mailed',
        'Sent letter',
        'Texted',
      ],
    },
    {
      field: 'contact',
      headerName: 'Contact in Last Communication',
      width: 150,
      editable: true,
    },
    {
      field: 'notes',
      headerName: 'Notes from Last Reach Out',
      width: 150,
      editable: true,
    },
    {
      field: 'nextDate',
      headerName: 'Next Reach Out',
      width: 150,
      editable: true,
      type: 'date',
      valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY'),
    },
    {
      field: 'outreachLetter',
      headerName: 'Outreach Letter File Upload',
      width: 200,
      renderCell: (params: GridRenderCellParams<Date>) => (
        <div style={{ width: '100%', display: 'flex', alignItems: 'start' }}>
          {params.row.outReachLetterFile ? (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Button
                variant="contained"
                onClick={() => {
                  handleFileGet(
                    params.row.outReachLetterFile.key,
                    params.row.outReachLetterFile.name,
                    params.row.outReachLetterFile.type,
                  );
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
                  handleFileDelete(params.row._id, 'outreachPDF');
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
                    handleFileUpload(e, params.row._id, 'outreachPDF');
                  }}
                />
              </Button>
            </div>
          )}
        </div>
      ),
    },
    {
      field: 'followUpLetter',
      headerName: 'Follow-Up Letter Sent',
      width: 200,
      renderCell: (params: GridRenderCellParams<Date>) => (
        <div style={{ width: '100%', display: 'flex', alignItems: 'start' }}>
          {params.row.followUpLetterFile ? (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Button
                variant="contained"
                onClick={() => {
                  handleFileGet(
                    params.row.followUpLetterFile.key,
                    params.row.followUpLetterFile.name,
                    params.row.followUpLetterFile.type,
                  );
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
                  handleFileDelete(params.row._id, 'followUpPDF');
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
                    handleFileUpload(e, params.row._id, 'followUpPDF');
                  }}
                />
              </Button>
            </div>
          )}
        </div>
      ),
    },
    {
      field: 'isReferral',
      headerName: 'Is Referral',
      width: 120,
      type: 'boolean',
      editable: true,
    },
    {
      field: 'survivorName',
      headerName: 'Name of Survivor',
      width: 150,
      editable: true,
    },
    // Todo: Make Drop Down Multiselect (with subheadings for Counseling/Therapy and Victim Services)
    {
      field: 'serviceRequested',
      headerName: 'Service Requested',
      width: 150,
      editable: true,
    },
    {
      field: 'agencyThatReferred',
      headerName: 'Agency that Referred',
      width: 150,
      editable: true,
    },
    {
      field: 'agencyRepName',
      headerName: 'Agency Rep Name',
      width: 150,
      editable: true,
    },
    {
      field: 'agencyRepEmail',
      headerName: 'Agency Rep Email',
      width: 150,
      editable: true,
    },
    {
      field: 'agencyRepPhone',
      headerName: 'Agency Rep Phone Number',
      width: 150,
      editable: true,
    },
    {
      field: 'departmentInCharge',
      headerName: 'Department',
      width: 150,
      editable: true,
    },
    //Todo: Make multiselect
    {
      field: 'survivorGender',
      headerName: 'Survivor Gender',
      width: 150,
      editable: true,
      type: 'singleSelect',
      valueOptions: [
        'Female',
        'Male',
        'Non-binary',
        'Transgender',
        'Other',
        'NA',
      ],
    },
    //Todo: Make multiselect
    {
      field: 'survivorRace',
      headerName: 'Survivor Race/Ethnicity',
      width: 150,
      editable: true,
    },
    {
      field: 'survivorDOB',
      headerName: 'Survivor Date of Birth',
      width: 150,
      editable: true,
      type: 'date',
      valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY'),
    },
    {
      field: 'survivorAge',
      headerName: 'Survivor Age',
      width: 150,
      editable: true,
    },
    {
      field: 'survivorEmail',
      headerName: 'Survivor Email',
      width: 150,
      editable: true,
    },
    {
      field: 'survivorPreferredContactMethod',
      headerName: 'Preferred Contact Method',
      width: 150,
      editable: true,
    },
    {
      field: 'survivorSchoolOrCommunitySite',
      headerName: 'Survivor School/Community Site',
      width: 150,
      editable: true,
    },
    {
      field: 'survivorGrade',
      headerName: 'Survivor Grade',
      width: 150,
      editable: true,
    },
    {
      field: 'incidentAddressObj',
      headerName: 'Incident Address',
      width: 150,
      editable: true,
      valueGetter: (params) => {
        let result: string[] = [];
        if (params.row.incidentAddressObj) {
          if (params.row.incidentAddressObj.street) {
            result.push(params.row.incidentAddressOb.street as string);
          }
        } else if (params.row.incidentAddress)  {
          result.push(params.row.incidentAddress as string)
        } else {
          result = ["Unknown"];
        }
        return result.join(", ");
      },
    },
    {
      field: 'incidentAddressObj',
      headerName: 'Incident Zipcode',
      width: 150,
      editable: true,
      valueGetter: (params) => {
        let result: string[] = [];
        if (params.row.incidentAddressObj) {
          if (params.row.incidentAddressObj.zipcode) {
            result.push(params.row.incidentAddressObj.zipcode as string);
          }
        } else {
          result = ["Unknown"];
        }
        return result.join(", ");
      },
    },
    {
      field: 'reportedToPolice',
      headerName: 'Reported To Police',
      width: 120,
      type: 'boolean',
      editable: true,
    },
    {
      field: 'isGuardianResponsible',
      headerName: 'Is Adult Responsible',
      width: 150,
      editable: true,
    },
    {
      field: 'guardianName',
      headerName: 'Name of Adult',
      width: 150,
      editable: true,
    },
    {
      field: 'guardianRelationship',
      headerName: 'Relationship of Adult to Victim',
      width: 150,
      editable: true,
    },
    {
      field: 'guardianAddressObj',
      headerName: 'Guardian Address',
      width: 150,
      editable: true,
      valueGetter: (params) => {
        let result: string[] = [];
        if (params.row.guardianAddressObj) {
          if (params.row.guardianAddressObj.street) {
            result.push(params.row.guardianAddressObj.street as string);
          }
        } else if (params.row.guardianAddress)  {
          result.push(params.row.guardianAddress as string)
        } else {
          result = ["Unknown"];
        }
        return result.join(", ");
      },
    },
    {
      field: 'guardianAddressObj',
      headerName: 'Guardian Zipcode',
      width: 150,
      editable: true,
      valueGetter: (params) => {
        let result: string[] = [];
        if (params.row.guardianAddressObj) {
          if (params.row.guardianAddressObj.zipcode) {
            result.push(params.row.guardianAddressObj.zipcode as string);
          }
        } else {
          result = ["Unknown"];
        }
        return result.join(", ");
      },
    },
    {
      field: 'guardianPhone',
      headerName: 'Phone # ofAdult',
      width: 150,
      editable: true,
    },
    {
      field: 'guardianEmail',
      headerName: 'Email Address of Adult',
      width: 150,
      editable: true,
    },
    {
      field: 'guardianPreferredContactMethod',
      headerName: 'Adult Preferred Contact Method',
      width: 150,
      editable: true,
    },
    {
      field: 'survivorAddressObj',
      headerName: 'Survivor Address',
      width: 150,
      editable: true,
      valueGetter: (params) => {
        console.log({ params });
        let result: string[] = [];
        if (params.row.survivorAddressObj) {
          if (params.row.survivorAddressObj.street) {
            result.push(params.row.survivorAddressObj.street as string);
          }
        } else if (params.row.survivorAddress) {
          result.push(params.row.survivorAddress as string)
        } else {
          result = ["Unknown"];
        }
        return result.join(", ");
      },
    },
    {
      field: 'survivorAddressObj',
      headerName: 'Survivor Zipcode',
      width: 150,
      editable: true,
      valueGetter: (params) => {
        console.log({ params });
        let result: string[] = [];
        if (params.row.survivorAddressObj) {
          if (params.row.survivorAddressObj.zipcode) {
            result.push(params.row.survivorAddressObj.zipcode as string);
          }
        } else {
          result = ["Unknown"];
        }
        return result.join(", ");
      },
    },
    {
      field: 'survivorPhoneNumber',
      headerName: 'Survivor Phone Number',
      width: 150,
      editable: true,
    },
    {
      field: 'notesFromOrg',
      headerName: 'Notes from Organization',
      width: 150,
      editable: true,
    },
    {
      field: 'referralPDF',
      headerName: 'Referral PDF',
      width: 200,
      renderCell: (params: GridRenderCellParams<Date>) => (
        <div style={{ width: '100%', display: 'flex', alignItems: 'start' }}>
          {params.row.referralFile ? (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Button
                variant="contained"
                onClick={() => {
                  handleFileGet(
                    params.row.referralFile.key,
                    params.row.referralFile.name,
                    params.row.referralFile.type,
                  );
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
                  handleFileDelete(params.row._id, 'referralPDF');
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
                    handleFileUpload(e, params.row._id, 'referralPDF');
                  }}
                />
              </Button>
            </div>
          )}
        </div>
      ),
    },
    {
      field: 'primaryLanguage',
      headerName: 'Primary Language',
      width: 150,
      editable: true,
    },
    {
      field: 'relationshipToVictim',
      headerName: 'Relationship to Victim',
      width: 150,
      editable: true,
    },
    {
      field: 'crimeDCNum',
      headerName: 'DC #',
      width: 150,
      editable: true,
    },
    {
      field: 'crimeDistrict',
      headerName: 'District of Crime',
      width: 150,
      editable: true,
    },
    {
      field: 'crimeDate',
      headerName: 'Date of Crime',
      width: 150,
      editable: true,
      type: 'date',
      valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY'),
    },
    {
      field: 'victimName',
      headerName: 'Name of Victim',
      width: 150,
      editable: true,
    },
    {
      field: 'victimGender',
      headerName: 'Gender of Victim',
      width: 150,
      editable: true,
    },
    {
      field: 'crimeType',
      headerName: 'Type of Crime/Victimization',
      width: 150,
      editable: true,
    },
    {
      field: 'isGunViolence',
      headerName: 'Is Gun Violence',
      width: 150,
      editable: true,
    },
    {
      field: 'homDecedent',
      headerName: 'Homicide Decedent',
      width: 150,
      editable: true,
    },
    {
      field: 'homDateOfDeath',
      headerName: 'Homicide Date of Death',
      width: 150,
      editable: true,
      type: 'date',
      valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY'),
    },
    {
      field: 'homCauseOfDeath',
      headerName: 'Homicide Cause Of Death',
      width: 150,
      editable: true,
    },
    {
      field: 'homType',
      headerName: 'Type of Homicide',
      width: 150,
      editable: true,
    },
    {
      field: 'homLocation',
      headerName: 'Homicide Location',
      width: 150,
      editable: true,
    },
    {
      field: 'homAddress',
      headerName: 'Homicide Address',
      width: 150,
      editable: true,
      valueGetter: (params) => {
        let result: string[] = [];
        if (params.row.homAddressObj) {
          if (params.row.homAddressObj.street) {
            result.push(params.row.homAddressObj.street as string);
          }
        } else if (params.row.homAddress)  {
          result.push(params.row.homAddress as string)
        } else {
          result = ["Unknown"];
        }
        return result.join(", ");
      },
    },
    {
      field: 'homZipCode',
      headerName: 'Homicide Zip Code',
      width: 150,
      editable: true,
    },
    {
      field: 'homDecedentAge',
      headerName: 'Homicide Decedent Age',
      width: 150,
      editable: true,
    },
    {
      field: 'homDecedentSex',
      headerName: 'Homicide Decedent Sex',
      width: 150,
      editable: true,
    },
    {
      field: 'homDecedentRace',
      headerName: 'Homicide Decedent Race',
      width: 150,
      editable: true,
    },
    {
      field: 'homDecedentEthnicity',
      headerName: 'Homicide Decedent Ethnicity',
      width: 150,
    },
    {
      field: 'homFMVNum',
      headerName: 'Homicide FMV #',
      width: 150,
      editable: true,
    },
    {
      field: 'homMEONum',
      headerName: 'Homicide MEO #',
      width: 150,
      editable: true,
    },
    {
      field: 'homMNum',
      headerName: 'Homicide M #',
      width: 150,
      editable: true,
    },
    {
      field: 'homCaseInformation',
      headerName: 'Homicide Case Information',
      width: 150,
      editable: true,
    },
  ];

  var removeLicense = setInterval(function () {
    if (
      typeof document.getElementsByClassName('MuiDataGrid-main')[0] ==
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

  if (!referralList) {
    return (
      <div style={{ width: '0', margin: 'auto' }}>
        <CircularProgress size={80} />
      </div>
    );
  }

  return (
    <Box sx={{ height: 700, width: '100%' }}>
      <DataGridPremium
        rows={referralList}
        columns={columns}
        rowHeight={42}
        checkboxSelection
        disableSelectionOnClick
        initialState={{
          columns: { columnVisibilityModel: { id: false } },
          pinnedColumns: { left: ['survivorName'], right: ['view'] },
          filter: {
            filterModel: {
              items: globalProps?.filter ? globalProps.filter : [],
            },
          },
        }}
        experimentalFeatures={{ newEditingApi: true }}
        components={{ Toolbar: GridToolbar }}
        processRowUpdate={(updatedRow, originalRow) => {
          console.log(updatedRow);
          const response = putData(
            `referral/${updatedRow.id}`,
            updatedRow,
          ).then(() => {
            const res = getData('referral/all').then((res) =>
              setReferrals(res),
            );
          });
          return updatedRow;
        }}
      />
    </Box>
  );
}
