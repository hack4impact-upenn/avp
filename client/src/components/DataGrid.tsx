/* eslint-disable */
import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGridPremium } from '@mui/x-data-grid-premium';
import { Button, Chip } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import LoopIcon from '@mui/icons-material/Loop';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { GridColumns, GridRenderCellParams } from '@mui/x-data-grid-pro';

/* Wrapper Around DataGridPremium */
export default function DataGrid() {
  const columns: GridColumns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'dept',
      headerName: 'AVP Department in Charge',
      width: 210,
      editable: true,
    },
    {
      field: 'program',
      headerName: 'AVP Program',
      width: 150,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Program 1', 'Program 2', 'Program 3'],
    },
    {
      field: 'staff',
      headerName: 'AVP Staff Assigned',
      type: 'singleSelect',
      valueOptions: ['Person 1', 'Person 2', 'Person 3'],
      width: 160,
      editable: true,
    },
    {
      field: 'therapist',
      headerName: 'Therapist Assigned',
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
      valueOptions: ['Assigned', 'Unassigned', 'In progress'],
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
                : 'error'
            }
            icon={
              params.row.status === 'Assigned' ? (
                <CheckIcon sx={{ fontSize: '22px' }} />
              ) : params.row.status === 'In progress' ? (
                <LoopIcon sx={{ fontSize: '22px' }} />
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
          >
            View
          </Button>
        </div>
      ),
    },
    {
      field: 'lastDate',
      headerName: 'Last Reached Out',
      width: 150,
      editable: true,
      type: 'date',
    },
    {
      field: 'method',
      headerName: 'Method of Last Communication',
      width: 170,
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
    },
    {
      field: 'nextDate',
      headerName: 'Next Reach Out',
      width: 150,
      editable: true,
      type: 'date',
    },
    {
      field: 'isReferral',
      headerName: 'Is Referral',
      width: 120,
      type: 'boolean',
      editable: true,
    },
    {
      field: 'name',
      headerName: 'Name of Survivor',
      width: 150,
    },
    {
      field: 'service',
      headerName: 'Service Requested',
      width: 150,
    },
    {
      field: 'agency',
      headerName: 'Agency that Referred',
      width: 150,
    },
    {
      field: 'repName',
      headerName: 'Agency Rep Name',
      width: 150,
    },
    {
      field: 'repEmail',
      headerName: 'Agency Rep Email',
      width: 150,
    },
    {
      field: 'repNumber',
      headerName: 'Agency Rep Phone Number',
      width: 150,
    },
    {
      field: 'gender',
      headerName: 'Survivor Gender',
      width: 150,
    },
    {
      field: 'race',
      headerName: 'Survivor Race/Ethnicity',
      width: 150,
    },
    {
      field: 'birthday',
      headerName: 'Survivor Date of Birth',
      width: 150,
      editable: true,
      type: 'date',
    },
    {
      field: 'age',
      headerName: 'Survivor Age',
      width: 150,
    },
    {
      field: 'school',
      headerName: 'What School or Community does Survivor Attend?',
      width: 150,
    },
    {
      field: 'grade',
      headerName: 'What Grade is the Survivor in?',
      width: 150,
    },
    {
      field: 'isParentContact',
      headerName:
        'Is a parent/responsible adult the main contact for the survivor/victim? For therapy, survivor/victims 14 years old and older can sign themselves up',
      width: 150,
    },
    {
      field: 'parentName',
      headerName: 'Name of Parent/Responsible Adult',
      width: 150,
    },
    {
      field: 'relationship',
      headerName: 'Relationship to victim/survivor being referred',
      width: 150,
    },
    {
      field: 'parentAddress',
      headerName: 'Address of Parent/Responsible Adult',
      width: 150,
    },
    {
      field: 'parentPhone',
      headerName: 'Phone # of Parent/Responsible Adult',
      width: 150,
    },
    {
      field: 'parentEmail',
      headerName: 'Email Address of Parent/Responsible Adult',
      width: 150,
    },
    {
      field: 'parentContactMethod',
      headerName: 'Preferred Contact Method',
      width: 150,
    },
    {
      field: 'address',
      headerName: 'Survivor Complete Address',
      width: 150,
    },
    {
      field: 'phone',
      headerName: 'Survivor Phone Number',
      width: 150,
    },
    {
      field: 'notes',
      headerName: 'Notes from Organization',
      width: 150,
    },
    {
      field: 'referralPDF',
      headerName: 'Referral PDF',
      width: 150,
    },
    {
      field: 'language',
      headerName: 'Primary Language',
      width: 150,
    },
    {
      field: 'relationshipToVictim',
      headerName: 'Relationship to Victim',
      width: 150,
    },
    {
      field: 'incidentNo',
      headerName: 'Crime Incident Number (DC #)',
      width: 150,
    },
    {
      field: 'districtOfCrime',
      headerName: 'Police District of Crime',
      width: 150,
    },
    {
      field: 'dateOfCrime',
      headerName: 'Date of Crime',
      width: 150,
      editable: true,
      type: 'date',
    },
    {
      field: 'typeOfCrime',
      headerName: 'Type of Crime/Victimization',
      width: 150,
    },
    {
      field: 'hasGun',
      headerName: 'Gun Violence?',
      width: 150,
    },
    {
      field: 'decedent',
      headerName: 'Decedent',
      width: 150,
    },
    {
      field: 'deathDate',
      headerName: 'Date of Death',
      width: 150,
      editable: true,
      type: 'date',
    },
    {
      field: 'deathCause',
      headerName: 'Cause of Death',
      width: 150,
    },
    {
      field: 'homicideType',
      headerName: 'Type of Homicide',
      width: 150,
    },
    {
      field: 'location',
      headerName: 'Location',
      width: 150,
    },
    {
      field: 'incidentAddress',
      headerName: 'Address of Incident',
      width: 150,
    },
    {
      field: 'incidentZip',
      headerName: 'Zip Code of Incident',
      width: 150,
    },
    {
      field: 'decedentAge',
      headerName: 'Decedent Age',
      width: 150,
    },
    {
      field: 'decedentSex',
      headerName: 'Decedent Sex',
      width: 150,
    },
    {
      field: 'decedentRace',
      headerName: 'Decedent Race',
      width: 150,
    },
    {
      field: 'decedentEthnicity',
      headerName: 'Decedent Ethnicity',
      width: 150,
    },
    {
      field: 'fmv',
      headerName: 'FMV #',
      width: 150,
    },
    {
      field: 'meo',
      headerName: 'MEO #',
      width: 150,
    },
    {
      field: 'm',
      headerName: 'M #',
      width: 150,
    },
    {
      field: 'caseInfo',
      headerName: 'Case Information',
      width: 150,
    },
  ];

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: 'Derry', age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

  var removeLicense = setInterval(function () {
    if (
      typeof document.getElementsByClassName('MuiDataGrid-main')[0] ==
      'undefined'
    )
      return;
    clearInterval(removeLicense);
    document
      .getElementsByClassName('MuiDataGrid-main')[0]
      .childNodes[2].remove();
  }, 10);

  return (
    <Box sx={{ height: 520, width: '100%' }}>
      <DataGridPremium
        rows={rows}
        columns={columns}
        rowHeight={42}
        checkboxSelection
        disableSelectionOnClick
        initialState={{ pinnedColumns: { right: ['view'] } }}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}
