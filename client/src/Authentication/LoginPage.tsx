import React, { useState } from 'react';
import { TextField, Link, Typography, Grid } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAppDispatch } from '../util/redux/hooks';
import { login as loginRedux } from '../util/redux/userSlice';
import FormGrid from '../components/form/FormGrid';
import FormCol from '../components/form/FormCol';
import FormRow from '../components/form/FormRow';
import { emailRegex, InputErrorMessage } from '../util/inputvalidation';
import { loginUser } from './api';
import AlertDialog from '../components/AlertDialog';
import PrimaryButton from '../components/buttons/PrimaryButton';
import ScreenGrid from '../components/ScreenGrid';
import DataGrid from '../components/DataGrid';
import avpLogo from '../assets/avpLogo.svg';
import COLORS from '../assets/colors';

/**
 * A page allowing users to input their email and password to login. The default
 * starting page of the application
 */
function LoginPage() {
  const navigate = useNavigate();

  // Default values for state
  const defaultValues = {
    email: '',
    password: '',
  };
  const defaultShowErrors = {
    email: false,
    password: false,
    alert: false,
  };
  const defaultErrorMessages = {
    email: '',
    password: '',
    alert: '',
  };
  type ValueType = keyof typeof values;

  // State values and hooks
  const [values, setValueState] = useState(defaultValues);
  const [showError, setShowErrorState] = useState(defaultShowErrors);
  const [errorMessage, setErrorMessageState] = useState(defaultErrorMessages);

  // Helper functions for changing only one field in a state object
  const setValue = (field: string, value: string) => {
    setValueState((prevState) => ({
      ...prevState,
      ...{ [field]: value },
    }));
  };
  const setShowError = (field: string, show: boolean) => {
    setShowErrorState((prevState) => ({
      ...prevState,
      ...{ [field]: show },
    }));
  };
  const setErrorMessage = (field: string, msg: string) => {
    setErrorMessageState((prevState) => ({
      ...prevState,
      ...{ [field]: msg },
    }));
  };

  const alertTitle = 'Error';
  const handleAlertClose = () => {
    setShowError('alert', false);
  };

  const dispatch = useAppDispatch();
  function dispatchUser(
    userEmail: string,
    firstName: string,
    lastName: string,
    admin: boolean,
  ) {
    dispatch(loginRedux({ email: userEmail, firstName, lastName, admin }));
  }

  const clearErrorMessages = () => {
    setShowErrorState(defaultShowErrors);
    setErrorMessageState(defaultErrorMessages);
  };

  const validateInputs = () => {
    clearErrorMessages();
    let isValid = true;

    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const valueTypeString in values) {
      const valueType = valueTypeString as ValueType;
      if (!values[valueType]) {
        setErrorMessage(valueTypeString, InputErrorMessage.MISSING_INPUT);
        setShowError(valueTypeString, true);
        isValid = false;
      }
    }

    if (!values.email.match(emailRegex)) {
      setErrorMessage('email', InputErrorMessage.INVALID_EMAIL);
      setShowError('email', true);
      isValid = false;
    }
    if (!values.password) {
      setErrorMessage('password', InputErrorMessage.MISSING_INPUT);
      setShowError('password', true);
      isValid = false;
    }

    return isValid;
  };

  const navigateToForm = () => {
    navigate('/form', { replace: true });
  };

  async function handleSubmit() {
    if (validateInputs()) {
      loginUser(values.email, values.password)
        .then((user) => {
          dispatchUser(
            user.email!,
            user.firstName!,
            user.lastName!,
            user.admin!,
          );
          navigate('/home');
        })
        .catch((e) => {
          setShowError('alert', true);
          setErrorMessage('alert', e.message);
        });
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          height: '100vh',
          minHeight: '100vh',
          width: '40vw',
          backgroundColor: '#4EA0B3',
          marginRight: '100px',
        }}
      >
        <div style={{ color: 'white', display: 'flex' }}>
          <img
            src={avpLogo}
            alt="logo"
            style={{ marginTop: '200px', marginLeft: '70px' }}
          />
          <div style={{ marginTop: '200px', marginLeft: '10px' }}>
            Anti-Violence <br /> Partnership of Philadelphia
          </div>
        </div>
        <div
          style={{
            marginTop: '20px',
            marginLeft: '70px',
            marginRight: '70px',
            color: 'white',
            fontSize: '48px',
          }}
        >
          Together, we can end the cycle of violence.{' '}
        </div>
      </div>
      <FormGrid>
        <FormCol>
          <div style={{ color: 'black', display: 'flex' }}>
            <img
              src={avpLogo}
              alt="logo"
              style={{ marginTop: '70px', marginLeft: '10px' }}
            />
            <div
              style={{
                marginTop: '70px',
                marginLeft: '10px',
                fontWeight: 'bold',
                fontSize: '1.2rem',
              }}
            >
              Anti-Violence <br /> Partnership of Philadelphia
            </div>
          </div>
          <Grid item container justifyContent="center">
            <Typography
              variant="h2"
              textAlign="center"
              marginTop="50px"
              style={{ color: COLORS.primaryAVPColor }}
            >
              Are you an AVP Partner?
            </Typography>
          </Grid>
          <Grid item container justifyContent="center">
            <PrimaryButton
              fullWidth
              style={{ margin: '1rem' }}
              onClick={() => navigateToForm()}
              variant="contained"
            >
              Submit a referral
            </PrimaryButton>
          </Grid>
        </FormCol>
        <FormCol>
          <div style={{ color: 'black', display: 'flex' }}>
            <img
              src={avpLogo}
              alt="logo"
              style={{ marginTop: '200px', marginLeft: '10px' }}
            />
            <div
              style={{
                marginTop: '200px',
                marginLeft: '10px',
                fontWeight: 'bold',
                fontSize: '1.2rem',
              }}
            >
              Anti-Violence <br /> Partnership of Philadelphia
            </div>
          </div>
          <Grid item container justifyContent="center">
            <Typography
              variant="h2"
              textAlign="center"
              marginTop="20px"
              style={{ color: COLORS.primaryAVPColor }}
            >
              For AVP Staff - Login to Outreach Database
            </Typography>
          </Grid>
          <Grid item width="1">
            <TextField
              fullWidth
              error={showError.email}
              helperText={errorMessage.email}
              type="email"
              required
              label="Email"
              value={values.email}
              onChange={(e) => setValue('email', e.target.value)}
            />
          </Grid>
          <Grid item width="1">
            <TextField
              fullWidth
              error={showError.password}
              helperText={errorMessage.password}
              type="password"
              required
              label="Password"
              value={values.password}
              onChange={(e) => setValue('password', e.target.value)}
            />
          </Grid>
          <Grid item container justifyContent="center">
            <PrimaryButton
              fullWidth
              type="submit"
              variant="contained"
              onClick={() => handleSubmit()}
            >
              Login
            </PrimaryButton>
          </Grid>
          <FormRow>
            <Grid item>
              <Link component={RouterLink} to="/email-reset">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/register">
                Sign up
              </Link>
            </Grid>
          </FormRow>
        </FormCol>
      </FormGrid>
      {/* The alert that pops up */}
      <Grid item>
        <AlertDialog
          showAlert={showError.alert}
          title={alertTitle}
          message={errorMessage.alert}
          onClose={handleAlertClose}
        />
      </Grid>
    </div>
  );
}

export default LoginPage;
