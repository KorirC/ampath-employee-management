import { Route, Switch } from 'react-router-dom';
import styles from './NavigationBar.module.css';
import {
  Header,
  HeaderContainer,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderName,
  HeaderNavigation,
  HeaderSideNavItems,
  Modal,
  SideNav,
  SideNavItems,
  SkipToContent,
} from 'carbon-components-react';
import { Dashboard } from '../Dashboard/dashboard';
import TimesheetUpload from '../Timesheets/timesheetUpload';
import { Report } from '../Reports/reports';
import { EmployeeRegistrationForm } from '../Employee/Registration/employee-registration.component';
import Login from '../Login/login';
import Employeeprofile from '../Employee/Profile/employee-profile';
import { EmployeeTrackingForm } from '../Employee/Tracking/employee-tracking.component';
import { useState } from 'react';
import { Register } from '../Register/register';
import { EmployeeTrackingInputProps } from '../Employee/Tracking/employee-tracking-types';

interface CallBackValuesProps {
  pfNumber: number;
  edit?: EmployeeTrackingInputProps;
}

const NavigationBar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [sidebar, setSidebar] = useState<boolean>(true);
  const [callBackValues, setCallBackValues] = useState<CallBackValuesProps>();
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
  return (
    <div>
      <div>
        <HeaderContainer
          render={({ isSideNavExpanded, onClickSideNavExpand }) => (
            <>
              <Header aria-label="AmpathPlus" className={styles.navbar}>
                <SkipToContent />
                <HeaderMenuButton aria-label="Open menu" onClick={onClickSideNavClosed} isActive={isSideNavExpanded} />
                <HeaderName href="#" prefix="AMPATH">
                  PLUS
                </HeaderName>
                <HeaderNavigation aria-label="AMPATH">
                  <HeaderMenuItem href="/Home">Home</HeaderMenuItem>
                  <HeaderMenuItem onClick={() => setOpen(true)}>Timesheets</HeaderMenuItem>
                  <HeaderMenuItem href="/Reports">Reports</HeaderMenuItem>
                </HeaderNavigation>
                <SideNav
                  className={sidebar ? styles.sideNavClosed : styles.sideNav}
                  aria-label="sideNav"
                  expanded={isSideNavExpanded}
                >
                  <SideNavItems>
                    <HeaderSideNavItems hasDivider={true}>
                      <HeaderMenuItem href="/Home">Home</HeaderMenuItem>
                      <HeaderMenuItem onClick={() => setOpen(true)}>Timesheets</HeaderMenuItem>
                      <HeaderMenuItem href="/Reports">Reports</HeaderMenuItem>
                      <HeaderMenuItem href="/LogOut">Log out</HeaderMenuItem>
                    </HeaderSideNavItems>
                  </SideNavItems>
                </SideNav>
              </Header>
            </>
          )}
        />
      </div>
      <div>
        <Switch>
          <Route path="/Home" component={Dashboard}></Route>
          <Route path="/RegisterUser" component={Register}></Route>
          <Route path="/Reports" component={Report}></Route>
          <Route path="/EmployeeRegistration" component={EmployeeRegistrationForm}></Route>
          <Route path="/LogOut" component={Login}></Route>
          <Route
            path="/EmployeeProfile/:pfNumber"
            component={() => <Employeeprofile parentCallback={handleCallback} />}
          ></Route>
          <Route path="/AddEmployeeTracking">
            <EmployeeTrackingForm pfNumber={callBackValues?.pfNumber} edit={callBackValues?.edit} />
          </Route>
        </Switch>
      </div>
      <Modal
        modalHeading="Upload Timesheet"
        open={open}
        preventCloseOnClickOutside
        passiveModal
        onRequestClose={() => {
          setOpen(false);
        }}
        // style={{ textAlign: 'center' }}
      >
        <TimesheetUpload />
      </Modal>
    </div>
  );
};
export default NavigationBar;
