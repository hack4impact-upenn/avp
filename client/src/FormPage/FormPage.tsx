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
import { IReferral, emptyReferral } from '../util/types/referral';
import IUser from '../util/types/user';

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
  const [didSubmit, setDidSubmit] = useState(false);
  const temp = {};

  // const [data, setData] = useState(temp);
  const [data, setData] = useState<IReferral>(emptyReferral);
  const [missingFields, setMissingFields] = useState(temp);

  // Todo: Should check if the contents of this page are valid before moving onto the next one
  const validateSubmit = () => {
    return true;
    // 1.  Pass to the backend - the backend should tell us which fields are missing / invalid
    // 2. If all fields are valid, then submit the form
    // 3. Else display which fields are missing / invalid
  };

  const handleNewReferral = () => {
    setDidSubmit(false);
    setActiveStep(0);
    setData(emptyReferral);
  };

  const handleNewReferralSameCrime = () => {
    setDidSubmit(false);
    setActiveStep(0);
    setData({
      ...data,
      staffName: '',
      status: '',
      departmentInCharge: '',
      program: '',
      staffAssigned: null,
      therapistAssigned: '',
      isReferral: true,
      survivorName: '',
      serviceRequested: '',
      survivorGender: '',
      survivorRace: '',
      survivorDOB: null,
      survivorAge: null,
      survivorSchoolOrCommunitySite: '',
      survivorGrade: '',
      isGuardianResponsible: null,
      guardianName: '',
      guardianRelationship: '',
      guardianAddress: '',
      guardianPhone: '',
      guardianEmail: '',
      guardianPreferredContactMethod: '',
      survivorEmailAddress: '',
      survivorAddress: '',
      survivorPhoneNumber: '',
      survivorPreferredContactMethod: '',
      notesFromOrg: '',
      historyOfCommunication: null,
      victimServicesOutcome: null,
      counsellingServicesOutcome: null,
      youthServicesOutcome: null,
      outreachLetterSent: null,
      transferredToCCWaitlist: null,
      followUpLetterSent: null,
      transferredToETO: null,
      serviceRequestedVictim: '',
      otherServiceRequestedVictim: '',
      survivorGenderOther: '',
      survivorRaceOther: '',
      relationshipToVictimOther: '',
      guardianRelationshipOther: '',
    });
  };

  const handleNext = () => {
    // make sure all the form segments are filled ? idunno
    console.log(activeStep);
    if (activeStep >= steps.length) {
      // Check if we are trying to resubmit
    }
    if (validateSubmit()) {
      console.log('Next page');
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      // Attempt to submit:
      if (activeStep === steps.length - 1) {
        console.log('Last page - Try submit');
        setData({ ...data, isReferral: true });
        if (data.isGuardianResponsible) {
          console.log('guardian responsible');
          setData({
            ...data,
            survivorEmailAddress: data.guardianEmail,
            survivorPhoneNumber: data.guardianPhone,
            survivorPreferredContactMethod: data.guardianPreferredContactMethod,
          });
        }
        console.log('data');
        console.log(data);
        postData(`referral/create`, data).then((res) => {
          if (res.error) {
            console.log(res.error.data.fields);
            setMissingFields(
              res.error.data.fields
                ? res.error.data.fields
                : ['Error: failed to upload try again'],
            );
          } else {
            const referral = res.data;
            setDidSubmit(true);
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
        {activeStep >= steps.length ? <div /> : targetPage}
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
          {didSubmit && activeStep >= steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleNewReferralSameCrime}
              sx={{ color: 'white' }}
            >
              Submit Another Referral (Same Crime)
            </Button>
          ) : (
            <Button
              disabled={activeStep >= steps.length}
              variant="contained"
              onClick={handleNext}
              sx={{ color: 'white' }}
            >
              {activeStep >= steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          )}
        </Box>

        {didSubmit && activeStep >= steps.length - 1 ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              flexDirection: 'row',
              pt: 2,
            }}
          >
            <Button
              variant="contained"
              onClick={handleNewReferral}
              sx={{ color: 'white' }}
            >
              New Referral (Different Crime)
            </Button>
          </Box>
        ) : (
          <div />
        )}
      </div>
    </>
  );
}
