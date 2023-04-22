/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
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
import Outcome from './Outcome';
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
  const [activeStep, setActiveStep] = useState(0);
  const temp = {};
  const [data, setData] = useState(temp);
  // const [referralItem, setReferralItem] = useState<IReferral>([]);
  // const [error, setError] = useState(<null>);
  const referral = useData(`referral/${id}`);
  // const [referral, setReferral] = useState(temp);
  useEffect(() => {
    setData({ referral: referral?.data });
  }, [referral]);

  // eslint-disable-next-line no-console
  console.log(id);
  console.log(referral);
  console.log(data);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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

  let targetPage;
  switch (activeStep) {
    case 0:
      targetPage = (
        <div>
          <ServiceReq data={data} setData={setData} />
        </div>
      );
      break;
    case 1:
      targetPage = (
        <div>
          <VictimCrime data={data} setData={setData} />
        </div>
      );
      break;
    case 2:
      targetPage = (
        <div>
          <Contact data={data} setData={setData} />
        </div>
      );
      break;
    case 3:
      targetPage = (
        <div>
          <ReferralSource
            data={data}
            setData={setData}
            referral={referral?.data}
          />
        </div>
      );
      break;
    case 4:
      targetPage = (
        <div>
          <CommunicationHistory data={data} setData={setData} />
        </div>
      );
      break;
    case 5:
      targetPage = (
        <div>
          <Outcome data={data} setData={setData} />
        </div>
      );
      break;
    default:
      targetPage = (
        <div>
          <ServiceReq data={data} setData={setData} />
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
            <Tab sx={{ fontSize: '13px' }} label="Communication History" />
            <Tab label="Outcome of Referral" />
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
              <ReferralSource
                data={data}
                setData={setData}
                referral={referral.data}
              />
            </TabPanel>
            <TabPanel value={value} index={4}>
              <CommunicationHistory data={data} setData={setData} />
            </TabPanel>
            <TabPanel value={value} index={5}>
              <Outcome data={data} setData={setData} />
            </TabPanel>
          </div>
        ) : (
          <div key="invalid-referral">
            <p>Invalid referral id.</p>
          </div>
        )}
      </Box>
      {/* <FormStepper
        steps={steps}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />
      {activeStep === steps.length ? <div /> : targetPage}
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button
          variant="contained"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1, color: 'white' }}
        >
          Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button
          variant="contained"
          onClick={handleNext}
          sx={{ color: 'white' }}
        >
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Box> */}
    </div>
  );
}
