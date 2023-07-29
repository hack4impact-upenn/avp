/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { CircularProgress, Tab, Tabs } from '@mui/material';
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

export default function FormPage() {
  const { id } = useParams();
  const temp = {};
  const [data, setData] = useState(temp);
  const referral = useData(`referral/${id}`);

  const dataUpdateCommHistory = () => {
    setData({ data: referral?.data?.historyOfCommunication, error: null });
  };

  const dataUpdateVictimServicesOutcome = () => {
    setData({
      data: referral?.data?.victimServicesOutcome,
      error: null,
    });
  };

  const dataUpdateCounsellingServicesOutcome = () => {
    setData({
      data: referral?.data?.counsellingServicesOutcome,
      error: null,
    });
  };

  const dataUpdateYouthServicesOutcome = () => {
    setData({
      data: referral?.data?.youthServicesOutcome,
      error: null,
    });
  };

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

  return (
    <div style={styles.main}>
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
            <Tab
              sx={{ fontSize: '13px' }}
              label="Communication History"
              onClick={dataUpdateCommHistory}
            />
            <Tab
              label="Victim Services Outcome"
              onClick={dataUpdateVictimServicesOutcome}
            />
            <Tab
              label="Counselling Services Outcome"
              onClick={dataUpdateCounsellingServicesOutcome}
            />
            <Tab
              label="Youth Services Outcome"
              onClick={dataUpdateYouthServicesOutcome}
            />
          </Tabs>
        </div>
        {!referral ? (
          <div style={{ width: '0', margin: 'auto' }}>
            <CircularProgress size={80} />
          </div>
        ) : referral?.error == null ? (
          <div>
            <TabPanel value={value} index={0}>
              <ServiceReq data={data} setData={setData} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <VictimCrime data={data} setData={setData} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Contact data={data} setData={setData} />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <ReferralSource data={data} setData={setData} />
            </TabPanel>
            <TabPanel value={value} index={4}>
              <CommunicationHistory data={data} setData={setData} />
            </TabPanel>
            <TabPanel value={value} index={5}>
              <VictimServicesOutcome data={data} setData={setData} />
            </TabPanel>
            <TabPanel value={value} index={6}>
              <CounselingServicesOutcome data={data} setData={setData} />
            </TabPanel>
            <TabPanel value={value} index={7}>
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
