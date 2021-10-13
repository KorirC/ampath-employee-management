import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, useHistory, Switch } from 'react-router-dom';
import styles from './App.module.css';
import NavigationBar from './Components/Navigation/NavigationBar';
import { Login } from './Components/Login/login';
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes';
import { Register } from './Components/Register/register';
import { Logout16 } from '@carbon/icons-react';
import {
  HeaderContainer,
  Header,
  SkipToContent,
  HeaderMenuButton,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  Modal,
} from 'carbon-components-react';
import { Dashboard } from './Components/Dashboard/dashboard';
import Employeeprofile from './Components/Employee/Profile/employee-profile';
import { ShowTimesheet } from './Components/Employee/Profile/timesheetImage';
import { EmployeeRegistrationForm } from './Components/Employee/Registration/employee-registration.component';
import { EmployeeTrackingForm } from './Components/Employee/Tracking/employee-tracking.component';
import { EmployeeStatusReport } from './Components/Reports/reports';
import { EmployeeTrackingInputProps } from './Components/Employee/Tracking/employee-tracking-types';
import TimesheetUpload from './Components/Timesheets/timesheetUpload';
interface CallBackValuesProps {
  pfNumber: number;
  edit?: EmployeeTrackingInputProps;
}

function App() {
  const [open, setOpen] = useState<boolean>(false);
  const [sidebar, setSidebar] = useState<boolean>(true);
  const [callBackValues, setCallBackValues] = useState<CallBackValuesProps>();
  const history = useHistory();

  const handleCallback = (data) => {
    setCallBackValues(data);
  };

  const onClickSideNavClosed = () => {
    if (sidebar == true) {
      setSidebar(false);
    } else {
      setSidebar(true);
    }
  };
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    {
      token !== null ? setIsAuthenticated(true) : setIsAuthenticated(false);
    }
  });

  return (
    <>
      {!isAuthenticated ? (
        <>
          <Route exact path="/">
            <Login setIsAuthenticated={setIsAuthenticated} />
          </Route>
          <Route path="/RegisterUser" component={Register}></Route>
        </>
      ) : (
        <>
          <HeaderContainer
            render={({ isSideNavExpanded, onClickSideNavExpand }) => (
              <>
                <Header aria-label="AmpathPlus" className={styles.navbar}>
                  <SkipToContent />
                  <HeaderMenuButton
                    aria-label="Open menu"
                    onClick={onClickSideNavClosed}
                    isActive={isSideNavExpanded}
                  />
                  <HeaderName href="#" prefix="AMPATH">
                    PLUS
                  </HeaderName>
                  <HeaderNavigation aria-label="AMPATH">
                    <HeaderMenuItem href="/Home">Home</HeaderMenuItem>
                    <HeaderMenuItem onClick={() => setOpen(true)}>Timesheets</HeaderMenuItem>
                    <HeaderMenuItem href="/Reports">Reports</HeaderMenuItem>
                  </HeaderNavigation>
                  <HeaderGlobalBar>
                    <HeaderGlobalAction
                      id="logout"
                      aria-label="Log Out"
                      onClick={() => {
                        localStorage.clear();
                        setIsAuthenticated(false);
                        history.push('/');
                      }}
                    >
                      <Logout16 />
                    </HeaderGlobalAction>
                  </HeaderGlobalBar>
                </Header>
              </>
            )}
          />
          <div>
            <Switch>
              <ProtectedRoutes path="/Home" component={Dashboard} IsAuthenticated={isAuthenticated} />
              <ProtectedRoutes path="/Reports" component={EmployeeStatusReport} IsAuthenticated={isAuthenticated} />
              <ProtectedRoutes
                path="/EmployeeRegistration"
                component={EmployeeRegistrationForm}
                IsAuthenticated={isAuthenticated}
              />
              <Route path="/login" component={Login}></Route>
              <Route path="/image/:filename" component={ShowTimesheet} />
              <ProtectedRoutes
                path="/EmployeeProfile/:pfNumber"
                component={() => <Employeeprofile parentCallback={handleCallback} />}
                IsAuthenticated={isAuthenticated}
              />
              <ProtectedRoutes
                path="/AddEmployeeTracking"
                component={EmployeeTrackingForm}
                IsAuthenticated={isAuthenticated}
              >
                <EmployeeTrackingForm pfNumber={callBackValues?.pfNumber} edit={callBackValues?.edit} />
              </ProtectedRoutes>
            </Switch>
          </div>
          <Modal
            open={open}
            preventCloseOnClickOutside
            passiveModal
            onRequestClose={() => {
              setOpen(false);
            }}
          >
            <TimesheetUpload />
          </Modal>
        </>
      )}
    </>
  );
}

export default App;
