import { useEffect, useState } from 'react';
import { Route, useHistory, Switch } from 'react-router-dom';
import styles from './App.module.css';
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
} from 'carbon-components-react';
import { Dashboard } from './Components/Dashboard/dashboard';
import Employeeprofile from './Components/Employee/Profile/employee-profile';
import { ShowTimesheet } from './Components/Employee/Profile/timesheetImage';
import { EmployeeRegistrationForm } from './Components/Employee/Registration/employee-registration.component';
import { EmployeeTrackingForm } from './Components/Employee/Tracking/employee-tracking.component';
import { EmployeeStatusReport } from './Components/Reports/reports';
import TimesheetUpload from './Components/Timesheets/timesheetUpload';
import Dimensions from './Components/Dimensions/dimensions';

function App() {
  const [open, setOpen] = useState<boolean>(false);
  const [sidebar, setSidebar] = useState<boolean>(true);
  const history = useHistory();

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
      token !== null ? setIsAuthenticated(true) : isAuthenticated;
    }
  }, []);
  return (
    <>
      {isAuthenticated ? (
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
                    <HeaderMenuItem href="/Timesheet">Timesheets</HeaderMenuItem>
                    <HeaderMenuItem href="/Reports">Reports</HeaderMenuItem>
                    <HeaderMenuItem href="/Dimensions">Dimensions</HeaderMenuItem>
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
          <Switch>
            <ProtectedRoutes path="/Home" component={Dashboard} IsAuthenticated={isAuthenticated} />
            <ProtectedRoutes path="/Reports" component={EmployeeStatusReport} IsAuthenticated={isAuthenticated} />
            <ProtectedRoutes path="/Dimensions" component={Dimensions} IsAuthenticated={isAuthenticated} />
            <Route path="/Timesheet" component={TimesheetUpload} />
            <ProtectedRoutes
              path="/EmployeeRegistration/:pfNumber?"
              component={EmployeeRegistrationForm}
              IsAuthenticated={isAuthenticated}
            />
            <Route path="/image/:filename" component={ShowTimesheet} />
            <ProtectedRoutes
              path="/EmployeeProfile/:pfNumber"
              component={Employeeprofile}
              IsAuthenticated={isAuthenticated}
            />
            <ProtectedRoutes
              path="/AddEmployeeTracking/:pfNumber"
              component={EmployeeTrackingForm}
              IsAuthenticated={isAuthenticated}
            />
          </Switch>
        </>
      ) : (
        <Switch>
          <Route exact path="/">
            <Login setIsAuthenticated={setIsAuthenticated} />
          </Route>
          <Route path="/RegisterUser" component={Register}></Route>
        </Switch>
      )}
    </>
  );
}

export default App;
