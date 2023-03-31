/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import FormStepper from './FormStepper';
import PageOne from './PageOne';
import PageTwo from './PageTwo';
import PageThree from './PageThree';
import PageFour from './PageFour';
import { useData } from '../util/api';

const steps = [
  'Type of Service Requested',
  'Victimization/Crime Information',
  'Contact Info',
  'Referral Source Info',
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

  const referral = useData(`referral/${id}`);

  // eslint-disable-next-line no-console
  console.log(id);
  console.log(referral);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  let targetPage;
  switch (activeStep) {
    case 0:
      targetPage = (
        <div>
          <PageOne data={data} setData={setData} />
        </div>
      );
      break;
    case 1:
      targetPage = (
        <div>
          <PageTwo data={data} setData={setData} />
        </div>
      );
      break;
    case 2:
      targetPage = (
        <div>
          <PageThree data={data} setData={setData} />
        </div>
      );
      break;
    case 3:
      targetPage = (
        <div>
          <PageFour data={data} setData={setData} />
        </div>
      );
      break;
    default:
      targetPage = (
        <div>
          <PageOne data={data} setData={setData} />
        </div>
      );
  }

  return (
    <div style={styles.main}>
      <FormStepper
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
      </Box>
    </div>
  );
}
