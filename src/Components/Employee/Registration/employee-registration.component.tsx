import React, { useEffect, useRef, useState } from 'react';
import { FormikHelpers, useFormik } from 'formik';
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
  Form,
} from 'carbon-components-react';
import styles from './employee-registration.module.scss';
import { formValues } from './employee-registration-types';
import { validationSchema } from './validation/employee-registration-validation';
import { EmployeeRegistrationFormProps } from './employee-registration-types';
import { saveEmployeeInformation } from './employee-registration.resource';
import { useHistory, useParams } from 'react-router-dom';
import { getEmployeeProfile } from '../../../commonResources/common.resource';

export const EmployeeRegistrationForm: React.FC = () => {
  const [formIsComplete, setFormIsComplete] = useState<boolean>(false);
  const [errorInForm, setErrorInForm] = useState<boolean>(false);
  const [pfNumber, setPfNumber] = useState<number>();
  const history = useHistory();
  const { pfNumber: pf } = useParams<{ pfNumber: string }>();

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

  const formik = useFormik({
    initialValues: formValues,
    onSubmit: onFormSubmit,
    validationSchema: validationSchema,
  });

  useEffect(() => {
    formIsComplete &&
      pfNumber &&
      setTimeout(() => history.push(`/AddEmployeeTracking/${pfNumber}`, history.location.pathname), 2000);
  }, [formIsComplete, pfNumber]);

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
          <h3>Create Employee</h3>
          <SideNavDivider />
          <SideNavLink onClick={handleBasicRef}>Basic info</SideNavLink>
          <SideNavDivider />
          <SideNavLink onClick={handleContactRef}>Contact details</SideNavLink>
          <SideNavDivider />
          <SideNavLink onClick={handleEmployeeRef}>Employee details</SideNavLink>
          <SideNavDivider />
        </SideNavItems>
      </SideNav>
      <div>
        <Grid>
          <Row>
            <Column>
              <Form className={styles.form} onSubmit={formik.handleSubmit}>
                <h4 ref={basicRef} className={styles.header}>
                  1. Basic info
                </h4>
                <RadioButtonGroup
                  name="salutation"
                  legendText="Salutation"
                  onChange={(event) => {
                    formik.setFieldValue('salutation', event);
                  }}
                  valueSelected={formik.values.salutation}
                >
                  <RadioButton id="mr" key="mr" labelText="Mr" value="Mr" />
                  <RadioButton id="mrs" key="mrs" labelText="Mrs" value="Mrs" />
                  <RadioButton id="miss" key="miss" labelText="Miss" value="Miss" />
                </RadioButtonGroup>
                {formik.touched.salutation && formik.errors.salutation && (
                  <span className={styles.errorMsg}>{formik.errors.salutation}</span>
                )}

                <TextInput
                  id="firstName"
                  name="firstName"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  labelText="First name"
                  value={formik.values.firstName}
                  invalid={!!(formik.touched.firstName && formik.errors.firstName)}
                  invalidText={formik.errors.firstName}
                />
                <TextInput
                  id="middleName"
                  name="middleName"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  labelText="Middle name"
                  value={formik.values.middleName}
                  invalid={!!(formik.touched.middleName && formik.errors.middleName)}
                  invalidText={formik.errors.middleName}
                />
                <TextInput
                  id="lastName"
                  name="lastName"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  labelText="Last name"
                  value={formik.values.lastName}
                  invalid={!!(formik.touched.lastName && formik.errors.lastName)}
                  invalidText={formik.errors.lastName}
                />

                <TextInput
                  id="idNumber"
                  name="idNumber"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  labelText="Id number"
                  value={formik.values.idNumber}
                  invalid={!!(formik.touched.idNumber && formik.errors.idNumber)}
                  invalidText={formik.errors.idNumber}
                />

                <DatePicker
                  datePickerType="single"
                  onChange={([event]) => {
                    formik.setFieldValue('dob', dayjs(event).format('YYYY-MM-DD'));
                  }}
                  onBlur={formik.handleBlur}
                  maxDate={dayjs(new Date()).format('MM/DD/YYYY')}
                >
                  <DatePickerInput
                    id="dob"
                    name="dob"
                    type="date"
                    labelText="Date of birth"
                    placeholder="mm/dd/yyyy"
                    invalid={!!(formik.touched.dob && formik.errors.dob)}
                    invalidText={formik.errors.dob}
                  />
                </DatePicker>
                <RadioButtonGroup
                  name="gender"
                  legendText="Choose gender"
                  onChange={(event) => {
                    formik.setFieldValue('gender', event);
                  }}
                >
                  <RadioButton id="male" key="male" labelText="Male" value="Male" />
                  <RadioButton id="female" key="female" labelText="Female" value="Female" />
                </RadioButtonGroup>
                {formik.touched.gender && formik.errors.gender && (
                  <span className={styles.errorMsg}>{formik.errors.gender}</span>
                )}

                <h4 ref={contactRef} className={styles.header}>
                  2. Contact details
                </h4>
                <TextInput
                  id="telephone"
                  name="telephone"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  labelText="Phone number"
                  value={formik.values.telephone}
                  invalid={!!(formik.touched.telephone && formik.errors.telephone)}
                  invalidText={formik.errors.telephone}
                />
                <TextInput
                  id="email"
                  name="email"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  labelText="Email"
                  value={formik.values.email}
                  invalid={!!(formik.touched.email && formik.errors.email)}
                  invalidText={formik.errors.email}
                />
                <h4 ref={employeeRef} className={styles.header}>
                  3. Employee details
                </h4>
                <TextInput
                  id="pfNumber"
                  name="pfNumber"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  labelText="PF number"
                  value={formik.values.pfNumber}
                  invalid={!!(formik.touched.pfNumber && formik.errors.pfNumber)}
                  invalidText={formik.errors.pfNumber}
                />
                <TextInput
                  id="kraPin"
                  name="kraPin"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  labelText="KRA pin"
                  value={formik.values.kraPin}
                  invalid={!!(formik.touched.kraPin && formik.errors.kraPin)}
                  invalidText={formik.errors.kraPin}
                />
                <TextInput
                  id="nssf"
                  name="nssf"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  labelText="NSSF number"
                  value={formik.values.nssf}
                  invalid={!!(formik.touched.nssf && formik.errors.nssf)}
                  invalidText={formik.errors.nssf}
                />
                <TextInput
                  id="nhif"
                  name="nhif"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  labelText="NHIF number"
                  value={formik.values.nhif}
                  invalid={!!(formik.touched.nhif && formik.errors.nhif)}
                  invalidText={formik.errors.nhif}
                />
                <Button className={styles.submitBtn} type="submit">
                  Save
                </Button>
              </Form>
            </Column>
          </Row>
        </Grid>
      </div>
      {formIsComplete && (
        <>
          <ToastNotification
            title="Data saved successfully"
            timeout={3000}
            className={styles.toast}
            subtitle="Employee registration data saved successfully"
            kind="success"
          />
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
