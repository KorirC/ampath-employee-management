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
import { Search20, Notification20, AppSwitcher20, Add16 } from '@carbon/icons-react';
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
  const [callBackValues, setCallBackValues] = useState<CallBackValuesProps>();
  const handleCallback = (data) => {
    console.log('Handle', data);
    setCallBackValues(data);
  };
  console.log('Callback', callBackValues);
  return (
    <div>
      <div>
        <HeaderContainer
          render={({ isSideNavExpanded, onClickSideNavExpand }) => (
            <>
              <Header aria-label="AmpathPlus" className={styles.navbar}>
                <SkipToContent />
                <HeaderMenuButton aria-label="Open menu" onClick={onClickSideNavExpand} isActive={isSideNavExpanded} />
                <HeaderName href="#" prefix="AMPATH">
                  PLUS
                </HeaderName>
                <HeaderNavigation aria-label="AMPATH">
                  <HeaderMenuItem href="/Home">Home</HeaderMenuItem>
                  <HeaderMenuItem onClick={() => setOpen(true)}>Timesheets</HeaderMenuItem>
                  <HeaderMenuItem href="/Reports">Reports</HeaderMenuItem>
                  <HeaderMenuItem href="/LogOut">Log out</HeaderMenuItem>
                </HeaderNavigation>
                <HeaderGlobalBar>
                  <HeaderGlobalAction aria-label="Add new employee">
                    <Add16 />
                  </HeaderGlobalAction>
                  <HeaderGlobalAction aria-label="Search">
                    <Search20 />
                  </HeaderGlobalAction>
                  <HeaderGlobalAction aria-label="Notifications">
                    <Notification20 />
                  </HeaderGlobalAction>
                  <HeaderGlobalAction aria-label="App Switcher" tooltipAlignment="end">
                    <AppSwitcher20 />
                  </HeaderGlobalAction>
                </HeaderGlobalBar>
                {/* <SideNav aria-label="Side navigation" expanded={isSideNavExpanded}>
                  <SideNavItems>
                    <HeaderSideNavItems hasDivider={true}>
                      <HeaderMenuItem href="#">Home</HeaderMenuItem>
                      <HeaderMenuItem href="#">Timesheets</HeaderMenuItem>
                      <HeaderMenuItem href="#">Reports</HeaderMenuItem>
                      <HeaderMenuItem href="#">Log out</HeaderMenuItem>
                    </HeaderSideNavItems>
                  </SideNavItems>
                </SideNav> */}
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
