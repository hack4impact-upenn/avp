/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress, Tab, Tabs, TextField } from '@mui/material';
import FormStepper from './FormStepper';
import ServiceReq from './ServiceReq';
import VictimCrime from './VictimCrime';
import Contact from './Contact';
import ReferralSource from './ReferralSource';
import { useData } from '../util/api';
import VictimServicesOutcome from './VictimServicesOutcome';
import CounselingServicesOutcome from './CounselingServicesOutcome';
import YouthServicesOutcome from './YouthServicesOutcome';
import CommunicationHistory from './CommunicationHistory';
import AdditionalHomInfo from './AdditionalHomInfo';
import { IReferral, emptyReferral } from '../util/types/referral';
import { GlobalProps } from '../util/types/generic';

const steps = [
  'Type of Service Requested',
  'Victimization/Crime Information',
  'Contact Info',
  'Referral Source Info',
  'Communication History',
  'Outcome of Referral',
];

const styles = {
  main: {
    width: '85%',
    margin: '2% auto',
  },
};

export default function FormPage({ globalProps, setGlobalProps }: GlobalProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const temp = {};
  const [data, setData] = useState(temp);
  const referral = useData(`referral/${id}`);
  // const referral = id && id > 0 ? useData(`referral/${id}`) : emptyReferral;
  console.log(referral);

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  const [value, setValue] = useState(0);
  useEffect(() => {
    // dataUpdateForm();
    console.log('change referral');
    setData({ referral });
  }, [referral]);

  return (
    <div style={styles.main}>
      <Button
        startIcon={<ArrowBackIcon />}
        variant="contained"
        color="primary"
        onClick={(e) => {
          setGlobalProps({
            ...globalProps,
            filter: [
              {
                columnField: 'id',
                operatorValue: 'contains',
                value: id,
              },
            ],
          });
          navigate('/database');
        }}
      >
        View in Database
      </Button>
      <Box sx={{ width: '100%' }}>
        <div
          style={{
            borderBottom: 1,
            borderColor: 'divider',
            width: '100%',
          }}
        >
          <Tabs
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: '100%',
            }}
            variant="fullWidth"
            value={value}
            onChange={(event, newValue) => setValue(newValue)}
            aria-label="basic tabs example"
          >
            <Tab label="Service Requested" />
            <Tab sx={{ fontSize: '13px' }} label="Victimization / Crime Info" />
            <Tab label="Contact Info" />
            <Tab label="Referral Source Info" />
            <Tab label="Additional Homicide Info" />
            <Tab sx={{ fontSize: '13px' }} label="Communication History" />
            <Tab label="Victim Services Outcome" />
            <Tab label="Counselling Services Outcome" />
            <Tab label="Youth Services Outcome" />
          </Tabs>
        </div>
        {!referral ? (
          <div style={{ width: '0', margin: 'auto' }}>
            <CircularProgress size={80} />
          </div>
        ) : referral?.error == null ? (
          <div>
            <TabPanel value={value} index={0}>
              <ServiceReq referral={data} setReferral={setData} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <VictimCrime referral={data} setReferral={setData} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Contact referral={data} setReferral={setData} />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <ReferralSource referral={data} setReferral={setData} />
            </TabPanel>
            <TabPanel value={value} index={4}>
              <AdditionalHomInfo referral={data} setReferral={setData} />
            </TabPanel>
            <TabPanel value={value} index={5}>
              <CommunicationHistory referral={data} setReferral={setData} />
            </TabPanel>
            <TabPanel value={value} index={6}>
              <VictimServicesOutcome data={data} setData={setData} />
            </TabPanel>
            <TabPanel value={value} index={7}>
              <CounselingServicesOutcome data={data} setData={setData} />
            </TabPanel>
            <TabPanel value={value} index={8}>
              <YouthServicesOutcome data={data} setData={setData} />
            </TabPanel>
          </div>
        ) : (
          <div key="invalid-referral">
            <p>Invalid referral id.</p>
          </div>
        )}
      </Box>
    </div>
  );
}
