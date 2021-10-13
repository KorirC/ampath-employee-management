import React, { useRef, useState } from 'react';
import { Formik, Form, FormikHelpers, ErrorMessage } from 'formik';
import dayjs from 'dayjs';
import {
  Button,
  TextInput,
  DatePicker,
  DatePickerInput,
  RadioButton,
  RadioButtonGroup,
  Column,
  Grid,
  ToastNotification,
  SideNav,
  SideNavItems,
  SideNavDivider,
  SideNavLink,
  Row,
} from 'carbon-components-react';
import styles from './employee-registration.module.scss';
import { formValues } from './employee-registration-types';
import { validationSchema } from './validation/employee-registration-validation';
import { EmployeeRegistrationFormProps } from './employee-registration-types';
import { saveEmployeeInformation } from './employee-registration.resource';
import { EmployeeTrackingForm } from '../Tracking/employee-tracking.component';

export const EmployeeRegistrationForm: React.FC = () => {
  const [formIsComplete, setFormIsComplete] = useState<boolean>(false);
  const [errorInForm, setErrorInForm] = useState<boolean>(false);
  const [pfNumber, setPfNumber] = useState<number>();
  const onFormSubmit = (
    values: EmployeeRegistrationFormProps,
    helpers: FormikHelpers<EmployeeRegistrationFormProps>,
  ) => {
    helpers.setSubmitting(true);
    saveEmployeeInformation(values).then(
      (response) => {
        if (response.status === 200) {
          setFormIsComplete(true);
          setPfNumber(Number(values.pfNumber));
        }
      },
      (error) => {
        setErrorInForm(true);
        setTimeout(() => setErrorInForm(false), 3000);
        helpers.setSubmitting(false);
      },
    );
  };

  const handleCallback = (data) => {
    if (data.formSuccess) {
      setTimeout(() => setFormIsComplete(false), 2000);
    }
  };

  const basicRef = useRef<null | HTMLHeadingElement>(null);
  const contactRef = useRef<null | HTMLHeadingElement>(null);
  const employeeRef = useRef<null | HTMLHeadingElement>(null);

  const handleBasicRef = () => {
    basicRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const handleContactRef = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const handleEmployeeRef = () => {
    employeeRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <SideNav isFixedNav expanded={true} aria-label="SideNav">
        <SideNavItems>
          <SideNavDivider />
          <br />
          <h3>Create Employee</h3>
          <SideNavLink onClick={handleBasicRef}>Basic info</SideNavLink>
          <SideNavDivider />
          <SideNavLink onClick={handleContactRef}>Contact details</SideNavLink>
          <SideNavDivider />
          <SideNavLink onClick={handleEmployeeRef}>Employee details</SideNavLink>
          <SideNavDivider />
        </SideNavItems>
      </SideNav>

      {!formIsComplete && (
        <Formik validationSchema={validationSchema} initialValues={formValues} onSubmit={onFormSubmit}>
          {({ handleChange, setFieldValue, handleBlur, values, touched, errors, isSubmitting }) => (
            <Grid>
              <Form className={styles.form}>
                <h4 ref={basicRef} className={styles.header}>
                  1. Basic info
                </h4>
                <Row>
                  <Column>
                    <RadioButtonGroup
                      name="salutation"
                      legendText="Salutation"
                      onChange={(event) => {
                        setFieldValue('salutation', event);
                      }}
                    >
                      <RadioButton id="mr" key="mr" labelText="Mr" value="Mr" />
                      <RadioButton id="mrs" key="mrs" labelText="Mrs" value="Mrs" />
                      <RadioButton id="miss" key="miss" labelText="Miss" value="Miss" />
                    </RadioButtonGroup>
                    <ErrorMessage
                      name="salutation"
                      render={(message) => <span className={styles.errorMsg}>{message}</span>}
                    />
                  </Column>
                </Row>
                <Row>
                  <Column>
                    <TextInput
                      id="firstName"
                      name="firstName"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      labelText="First name"
                      value={values.firstName}
                      invalid={!!(touched.firstName && errors.firstName)}
                      invalidText={errors.firstName}
                    />
                  </Column>
                  <Column>
                    <TextInput
                      id="middleName"
                      name="middleName"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      labelText="Middle name"
                      value={values.middleName}
                      invalid={!!(touched.middleName && errors.middleName)}
                      invalidText={errors.middleName}
                    />
                  </Column>
                  <Column>
                    <TextInput
                      id="lastName"
                      name="lastName"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      labelText="Last name"
                      value={values.lastName}
                      invalid={!!(touched.lastName && errors.lastName)}
                      invalidText={errors.lastName}
                    />
                  </Column>
                </Row>
                <Row>
                  <Column>
                    <TextInput
                      id="idNumber"
                      name="idNumber"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      labelText="Id number"
                      value={values.idNumber}
                      invalid={!!(touched.idNumber && errors.idNumber)}
                      invalidText={errors.idNumber}
                    />
                  </Column>
                </Row>
                <Row>
                  <Column>
                    <DatePicker
                      datePickerType="single"
                      onChange={([event]) => {
                        setFieldValue('dob', dayjs(event).format('YYYY-MM-DD'));
                      }}
                      onBlur={handleBlur}
                      maxDate={dayjs(new Date()).format('MM/DD/YYYY')}
                    >
                      <DatePickerInput
                        id="dob"
                        name="dob"
                        type="date"
                        labelText="Date of birth"
                        placeholder="mm/dd/yyyy"
                        invalid={!!(touched.dob && errors.dob)}
                        invalidText={errors.dob}
                      />
                    </DatePicker>
                  </Column>
                  <Column>
                    <RadioButtonGroup
                      name="gender"
                      legendText="Choose gender"
                      onChange={(event) => {
                        setFieldValue('gender', event);
                      }}
                    >
                      <RadioButton id="male" key="male" labelText="Male" value="Male" />
                      <RadioButton id="female" key="female" labelText="Female" value="Female" />
                    </RadioButtonGroup>
                    <ErrorMessage
                      name="gender"
                      render={(message) => <span className={styles.errorMsg}>{message}</span>}
                    />
                  </Column>
                </Row>
                <h4 ref={contactRef} className={styles.header}>
                  2. Contact details
                </h4>
                <Column>
                  <TextInput
                    id="telephone"
                    name="telephone"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    labelText="Phone number"
                    value={values.telephone}
                    invalid={!!(touched.telephone && errors.telephone)}
                    invalidText={errors.telephone}
                  />
                </Column>
                <Column>
                  <TextInput
                    id="email"
                    name="email"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    labelText="Email"
                    value={values.email}
                    invalid={!!(touched.email && errors.email)}
                    invalidText={errors.email}
                  />
                </Column>
                <h4 ref={employeeRef} className={styles.header}>
                  3. Employee details
                </h4>
                <Column>
                  <TextInput
                    id="pfNumber"
                    name="pfNumber"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    labelText="PF number"
                    value={values.pfNumber}
                    invalid={!!(touched.pfNumber && errors.pfNumber)}
                    invalidText={errors.pfNumber}
                  />
                </Column>
                <Column>
                  <TextInput
                    id="kraPin"
                    name="kraPin"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    labelText="KRA pin"
                    value={values.kraPin}
                    invalid={!!(touched.kraPin && errors.kraPin)}
                    invalidText={errors.kraPin}
                  />
                </Column>
                <Column>
                  <TextInput
                    id="nssf"
                    name="nssf"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    labelText="NSSF number"
                    value={values.nssf}
                    invalid={!!(touched.nssf && errors.nssf)}
                    invalidText={errors.nssf}
                  />
                </Column>
                <Column>
                  <TextInput
                    id="nhif"
                    name="nhif"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    labelText="NHIF number"
                    value={values.nhif}
                    invalid={!!(touched.nhif && errors.nhif)}
                    invalidText={errors.nhif}
                  />
                </Column>
                <Column>
                  <Button className={styles.submitBtn} type="submit">
                    Save
                  </Button>
                </Column>
              </Form>
            </Grid>
          )}
        </Formik>
      )}
      {formIsComplete && (
        <>
          <ToastNotification
            title="Data saved successfully"
            timeout={3000}
            className={styles.toast}
            subtitle="Employee registration data saved successfully"
            kind="success"
          />
          <EmployeeTrackingForm pfNumber={pfNumber} parentCallback={handleCallback} />
        </>
      )}
      {errorInForm && (
        <ToastNotification
          title="Error saving data"
          timeout={3000}
          className={styles.toast}
          subtitle="Employee registration data not saved"
          kind="error"
        />
      )}
    </>
  );
};
