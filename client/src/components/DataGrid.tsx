/* eslint-disable */
import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGridPremium, GridToolbar, useGridApiRef, } from '@mui/x-data-grid-premium';
import { Button, Chip } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import LoopIcon from '@mui/icons-material/Loop';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { GridColumns, GridRenderCellParams } from '@mui/x-data-grid-pro';

/* Wrapper Around DataGridPremium */
export default function DataGrid() {
  const apiRef = useGridApiRef();
  const columns: GridColumns = [
    { field: 'id', headerName: 'ID', width: 30 },
    {
      field: 'department',
      headerName: 'Department in Charge',
      width: 210,
      editable: true,
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
      field: 'staffAssigned',
      headerName: 'Staff',
      type: 'singleSelect',
      valueOptions: ['Person 1', 'Person 2', 'Person 3'],
      width: 160,
      editable: true,
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
      field: 'serviceRequested',
      headerName: 'Service Requested',
      width: 150,
    },
    {
      field: 'agencyThatReferred',
      headerName: 'Agency that Referred',
      width: 150,
    },
    {
      field: 'agencyRepName',
      headerName: 'Agency Rep Name',
      width: 150,
    },
    {
      field: 'agencyRepEmail',
      headerName: 'Agency Rep Email',
      width: 150,
    },
    {
      field: 'agencyRepPhone',
      headerName: 'Agency Rep Phone Number',
      width: 150,
    },
    {
      field: 'survivorGender',
      headerName: 'Survivor Gender',
      width: 150,
    },
    {
      field: 'survivorRace',
      headerName: 'Survivor Race/Ethnicity',
      width: 150,
    },
    {
      field: 'survivorDOB',
      headerName: 'Survivor Date of Birth',
      width: 150,
      editable: true,
      type: 'date',
    },
    {
      field: 'survivorAge',
      headerName: 'Survivor Age',
      width: 150,
    },
    {
      field: 'survivorSchoolOrCommunitySite',
      headerName: 'Survivor School/Community Site',
      width: 150,
    },
    {
      field: 'survivorGrade',
      headerName: 'Survivor Grade',
      width: 150,
    },
    {
      field: 'isParentContact',
      headerName:
        'Is Adult Responsible',
      width: 150,
    },
    {
      field: 'guardianName',
      headerName: 'Name of Adult',
      width: 150,
    },
    {
      field: 'guardianRelationship',
      headerName: 'Relationship of Adult to Victim',
      width: 150,
    },
    {
      field: 'guardianAddress',
      headerName: 'Address of Adult',
      width: 150,
    },
    {
      field: 'guardianPhone',
      headerName: 'Phone # ofAdult',
      width: 150,
    },
    {
      field: 'guardianEmail',
      headerName: 'Email Address of Adult',
      width: 150,
    },
    {
      field: 'guardianPreferredContactMethod',
      headerName: 'Adult Preferred Contact Method',
      width: 150,
    },
    {
      field: 'survivorAddress',
      headerName: 'Survivor Address',
      width: 150,
    },
    {
      field: 'survivorPhoneNumber',
      headerName: 'Survivor Phone Number',
      width: 150,
    },
    {
      field: 'notesFromOrg',
      headerName: 'Notes from Organization',
      width: 150,
    },
    {
      field: 'primaryLanguage',
      headerName: 'Primary Language',
      width: 150,
    },
    {
      field: 'relationshipToVictim',
      headerName: 'Relationship to Victim',
      width: 150,
    },
    {
      field: 'crimeDCNum',
      headerName: 'DC #',
      width: 150,
    },
    {
      field: 'crimeDistrict',
      headerName: 'District of Crime',
      width: 150,
    },
    {
      field: 'crimeDate',
      headerName: 'Date of Crime',
      width: 150,
      editable: true,
      type: 'date',
    },
    {
      field: 'crimeType',
      headerName: 'Type of Crime/Victimization',
      width: 150,
    },
    {
      field: 'isGunViolence',
      headerName: 'Is Gun Violence',
      width: 150,
    },
    {
      field: 'homDecendent',
      headerName: 'Homicide Decedent',
      width: 150,
    },
    {
      field: 'homDateOfDeath',
      headerName: 'Homicide Date of Death',
      width: 150,
      editable: true,
      type: 'date',
    },
    {
      field: 'homCauseOfDeath',
      headerName: 'Homicide Cause Of Death',
      width: 150,
    },
    {
      field: 'homType',
      headerName: 'Type of Homicide',
      width: 150,
    },
    {
      field: 'homLocation',
      headerName: 'Homicide Location',
      width: 150,
    },
    {
      field: 'homAddress',
      headerName: 'Homicide Address',
      width: 150,
    },
    {
      field: 'homZipCode',
      headerName: 'Homicide Zip Code',
      width: 150,
    },
    {
      field: 'homDecendentAge',
      headerName: 'Homicide Decedent Age',
      width: 150,
    },
    {
      field: 'homDecedentSex',
      headerName: 'Homicide Decedent Sex',
      width: 150,
    },
    {
      field: 'homDecedentRace',
      headerName: 'Homicide Decedent Race',
      width: 150,
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
    },
    {
      field: 'homMEONum',
      headerName: 'Homicide MEO #',
      width: 150,
    },
    {
      field: 'homMNum',
      headerName: 'Homicide M #',
      width: 150,
    },
    {
      field: 'homCaseInformation',
      headerName: 'Homicide Case Information',
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
        components={{ Toolbar: GridToolbar }}
      />
    </Box>
  );
}
