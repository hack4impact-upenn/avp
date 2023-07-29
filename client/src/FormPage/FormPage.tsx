/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormStepper from './FormStepper';
import PageOne from './PageOne';
import PageTwo from './PageTwo';
import PageThree from './PageThree';
import PageFour from './PageFour';
import Header from '../components/Header';
import { postData } from '../util/api';

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
  const [missingFields, setMissingFields] = useState(temp);

  const validateSubmit = () => {
    return true;
    // 1.  Pass to the backend - the backend should tell us which fields are missing / invalid
    // 2. If all fields are valid, then submit the form
    // 3. Else display which fields are missing / invalid
  };

  const handleNext = () => {
    // make sure all the form segments are filled ? idunno
    console.log(activeStep);
    if (validateSubmit()) {
      console.log('Next page');
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      if (activeStep === steps.length - 1) {
        console.log('Last page - Try submit');
        setData({ ...data, isReferral: true });
        console.log('data');
        console.log(data);
        postData(`referral/create`, data).then((res) => {
          if (res.error) {
            // TODO PRINT WHICH FIELDS ARE MISSING
            console.log(res.error.data.fields);
            setMissingFields(res.error.data.fields);
          } else {
            const referral = res.data;
            console.log('Successfully pushed!');
          }
        });
      }
    } else {
      console.log('invalid, try again');
    }
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
    <>
      <Header />
      <div style={styles.main}>
        <FormStepper
          steps={steps}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          missingFields={missingFields}
          setMissingFields={setMissingFields}
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
    </>
  );
}
