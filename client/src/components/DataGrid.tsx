/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';

import {
  DataGridPremium,
  GridToolbar,
  useGridApiRef,
} from '@mui/x-data-grid-premium';
import { Button, Chip } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import LoopIcon from '@mui/icons-material/Loop';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { GridColumns, GridRenderCellParams } from '@mui/x-data-grid-pro';
import { useData } from '../util/api';
import IReferral from '../util/types/referral';
import CircularProgress from '@mui/material/CircularProgress';

/* Wrapper Around DataGridPremium */
export default function DataGrid() {
  const [referralList, setReferralList] = useState<IReferral[]>([]);
  const referrals = useData('referral/all');

  useEffect(() => {
    setReferralList(
      referrals?.data.map((referral: IReferral) => {
        referral.id = referral._id;
        return referral;
      }),
    );
  }, [referrals]);

  const apiRef = useGridApiRef();
  const columns: GridColumns = [
    { field: 'id', headerName: 'ID', width: 30 },
    {
      field: 'department',
      headerName: 'Department in Charge',
      width: 210,
      editable: true,
      type: 'singleSelect',
      valueOptions: [
        'Counseling Services',
        'Victim/Witness Services',
        'Youth Services',
      ],
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
      valueOptions: [
        'Assigned',
        'Unassigned',
        'In progress',
        '1st unsuccessful attempt',
        '2nd unsuccessful attempt',
        '3rd unsuccessful attempt',
        'Completed',
        ' Transferred to ETO',
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
      width: 170,
      editable: true,
      type: 'date',
    },
    {
      field: 'method',
      headerName: 'Method of Last Communication',
      width: 170,
      editable: true,
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
      editable: true,
    },
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
      field: 'survivorGender',
      headerName: 'Survivor Gender',
      width: 150,
      editable: true,
    },
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
    },
    {
      field: 'survivorAge',
      headerName: 'Survivor Age',
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
      field: 'isParentContact',
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
      field: 'guardianAddress',
      headerName: 'Address of Adult',
      width: 150,
      editable: true,
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
      field: 'survivorAddress',
      headerName: 'Survivor Address',
      width: 150,
      editable: true,
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
      field: 'homDecendent',
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
    },
    {
      field: 'homZipCode',
      headerName: 'Homicide Zip Code',
      width: 150,
      editable: true,
    },
    {
      field: 'homDecendentAge',
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
    document
      .getElementsByClassName('MuiDataGrid-main')[0]
      .childNodes[2].remove();
  }, 10);

  if (!referralList) {
    return (
      <div style={{ width: '0', margin: 'auto' }}>
        <CircularProgress size={80} />
      </div>
    );
  }

  return (
    <Box sx={{ height: 520, width: '100%' }}>
      <DataGridPremium
        rows={referralList}
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
