/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormStepper from './FormStepper';
import PageOne from './PageOne';
import PageTwo from './PageTwo';

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
  const [activeStep, setActiveStep] = useState(0);
  const temp = {};
  const [data, setData] = useState(temp);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div style={styles.main}>
      <FormStepper
        steps={steps}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />
      {activeStep === 0 ? (
        <div>
          <PageOne data={data} setData={setData} />
        </div>
      ) : (
        activeStep === 1 && (
          <div>
            <PageTwo data={data} setData={setData} />
          </div>
        )
      )}
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1, color: 'white' }}
        >
          Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button color="inherit" onClick={handleNext} sx={{ color: 'white' }}>
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Box>
    </div>
  );
}
