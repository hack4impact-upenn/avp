/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { StepButton } from '@mui/material';

interface FormProps {
  steps: string[];
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function FormStepper({
  steps,
  activeStep,
  setActiveStep,
}: FormProps) {
  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box className="stepper" sx={{ width: '100%' }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepButton color="inherit" onClick={() => setActiveStep(index)}>
                {label}
              </StepButton>
              {/* <StepLabel {...labelProps}>{label}</StepLabel> */}
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button
              color="inherit"
              onClick={handleReset}
              sx={{ color: 'white' }}
            >
              Reset
            </Button>
          </Box>
        </>
      ) : (
        <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
      )}
    </Box>
  );
}
