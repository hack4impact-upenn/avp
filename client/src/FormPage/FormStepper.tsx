/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface FormProps {
  steps: string[];
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  missingFields: any;
  setMissingFields: React.Dispatch<React.SetStateAction<string>>;
}

export default function FormStepper({
  steps,
  activeStep,
  setActiveStep,
  missingFields,
  setMissingFields,
}: FormProps) {
  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box className="stepper" sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            {!missingFields
              ? `All steps completed - you&apos;re finished`
              : `Please fill out the following fields: ${missingFields.join(
                  `, `,
                )}`}
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
