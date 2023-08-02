import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Box, CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import theme from './assets/theme';
import { store, persistor } from './util/redux/store';
import NotFoundPage from './NotFound/NotFoundPage';
import HomePage from './Home/HomePage';
import AdminDashboardPage from './AdminDashboard/AdminDashboardPage';
import {
  UnauthenticatedRoutesWrapper,
  ProtectedRoutesWrapper,
  DynamicRedirect,
  AdminRoutesWrapper,
} from './util/routes';
import VerifyAccountPage from './Authentication/VerifyAccountPage';
import RegisterPage from './Authentication/RegisterPage';
import LoginPage from './Authentication/LoginPage';
import EmailResetPasswordPage from './Authentication/EmailResetPasswordPage';
import ResetPasswordPage from './Authentication/ResetPasswordPage';
import AlertPopup from './components/AlertPopup';
import InviteRegisterPage from './Authentication/InviteRegisterPage';
import DataGrid from './components/DataGrid';
import DatabasePage from './Database/DatabasePage';
import FormPage from './FormPage/FormPage';
import './index.css';
import ReferralViewPage from './ReferralView/ReferralViewPage';
import SideBar from './components/SideBar';
import { useData } from './util/api';

function App() {
  const authData = useData('auth/authstatus');
  const [loggedIn, setLoggedIn] = useState<boolean>(
    // eslint-disable-next-line  no-unneeded-ternary
    authData && !authData?.error ? true : false,
  );

  useEffect(() => {
    console.log('authData');
    console.log(authData);
    // eslint-disable-next-line  no-unneeded-ternary
    setLoggedIn(authData && !authData?.error ? true : false);
  }, [authData]);

  return (
    <div className="App">
      <Box sx={{ display: 'flex' }}>
        <SideBar isLoggedIn={loggedIn} />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <BrowserRouter>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider theme={theme}>
                  <CssBaseline>
                    <AlertPopup />
                    <Routes>
                      {/* Routes accessed only if user is not authenticated */}
                      <Route element={<UnauthenticatedRoutesWrapper />}>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/form" element={<FormPage />} />
                        <Route
                          path="/verify-account/:token"
                          element={<VerifyAccountPage />}
                        />
                        <Route
                          path="/email-reset"
                          element={<EmailResetPasswordPage />}
                        />
                        <Route
                          path="/reset-password/:token"
                          element={<ResetPasswordPage />}
                        />
                      </Route>
                      <Route
                        path="/invite/:token"
                        element={<InviteRegisterPage />}
                      />
                      {/* Routes accessed only if user is authenticated */}
                      <Route element={<ProtectedRoutesWrapper />}>
                        <Route path="/form" element={<FormPage />} />
                        <Route
                          path="/referral/:id"
                          element={<ReferralViewPage />}
                        />
                        <Route path="/database" element={<DatabasePage />} />
                        <Route path="/home" element={<HomePage />} />
                      </Route>
                      <Route element={<AdminRoutesWrapper />}>
                        <Route path="/users" element={<AdminDashboardPage />} />
                      </Route>

                      {/* Route which redirects to a different page depending on if the user is an authenticated or not by utilizing the DynamicRedirect component */}
                      <Route
                        path="/"
                        element={
                          <DynamicRedirect
                            unAuthPath="/login"
                            authPath="/home"
                          />
                        }
                      />

                      {/* Route which is accessed if no other route is matched */}
                      <Route path="*" element={<NotFoundPage />} />
                      <Route path="/form" element={<FormPage />} />
                    </Routes>
                  </CssBaseline>
                </ThemeProvider>
              </PersistGate>
            </Provider>
          </BrowserRouter>
        </Box>
      </Box>
    </div>
  );
}

export default App;
