import React, { useState, useMemo } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import dayjs from 'dayjs';
import {
  Button,
  TextInput,
  DatePicker,
  DatePickerInput,
  Select,
  SelectItem,
  Column,
  Row,
  Grid,
  ToastNotification,
} from 'carbon-components-react';
import { FormValues, EmployeeTrackingInputProps } from './employee-tracking-types';
import { validationSchema } from './employee-tracking-validation';
import { saveEmployeeTrackingInformation } from './employee-tracking-resource';
import styles from './employee-tracking.module.scss';
import {
  getBudgets,
  getCounties,
  getDepartments,
  getPrograms,
  getProjects,
  getSites,
} from '../../../commonResources/common.resource';

export interface EmployeeTrackingFormProps {
  pfNumber: number | undefined;
  parentCallback?(evnt): void;
  edit?: EmployeeTrackingInputProps;
}

export const EmployeeTrackingForm: React.FC<EmployeeTrackingFormProps> = (props) => {
  const [project, setProject] = useState<Array<any>>();
  const [department, setDepartment] = useState<Array<any>>();
  const [site, setSite] = useState<Array<any>>();
  const [county, setCounty] = useState<Array<any>>();
  const [budget, setBudget] = useState<Array<any>>();
  const [program, setProgram] = useState<Array<any>>();
  const [formSuccess, setFormSuccess] = useState<boolean>(false);
  const [formError, setFormError] = useState<boolean>(false);
  const [editValues, setEditValues] = useState<EmployeeTrackingInputProps>();

  useMemo(() => props.edit && setEditValues({ ...props.edit }), [props.edit]);

  const handleFormSubmit = (values: EmployeeTrackingInputProps, helpers: FormikHelpers<EmployeeTrackingInputProps>) => {
    values.pfNumber = `${props.pfNumber}`;
    saveEmployeeTrackingInformation(values)
      .then((response) => {
        if (response.status === 200) {
          setFormSuccess(true);
          props.parentCallback?.({ formSuccess: true });
        }
      })
      .catch((error) => {
        setFormError(true);
        props.parentCallback?.({ formSuccess: false });
      });
  };

  useMemo(() => {
    getProjects().then((response) => {
      let results = response.data.map((resp) => {
        return resp;
      });
      setProject(results);
    });
    getDepartments().then((response) => {
      let results = response.data.map((resp) => {
        return resp;
      });
      setDepartment(results);
    });
    getSites().then((response) => {
      let results = response.data.map((resp) => {
        return resp;
      });
      setSite(results);
    });
    getCounties().then((response) => {
      let results = response.data.map((resp) => {
        return resp;
      });
      setCounty(results);
    });
    getBudgets().then((response) => {
      let results = response.data.map((resp) => {
        return resp;
      });
      setBudget(results);
    });
    getPrograms().then((response) => {
      let results = response.data.map((resp) => {
        return resp;
      });
      setProgram(results);
    });
  }, []);

  return (
    <>
      {formSuccess && (
        <ToastNotification
          title="Data saved successfully"
          className={styles.toast}
          timeout={3000}
          subtitle="Employee tracking data saved successfully"
          kind="success"
        />
      )}
      {formError && (
        <ToastNotification
          title="Error saving data"
          className={styles.toast}
          timeout={3000}
          subtitle="Employee tracking data not saved"
          kind="error"
        />
      )}
      <Formik initialValues={FormValues || editValues} validationSchema={validationSchema} onSubmit={handleFormSubmit}>
        {({ values, handleChange, handleBlur, setFieldValue, touched, errors }) => (
          <Form className={styles.form}>
            <Column>
              <Select
                id="project"
                name="project"
                labelText="Project"
                onChange={handleChange}
                onBlur={handleBlur}
                invalid={!!(touched.project && errors.project)}
                invalidText={errors.project}
              >
                <SelectItem text="--Choose project--" value="" />
                {project?.map((item, index) => (
                  <SelectItem key={index} text={item.name} value={item.projectId} />
                ))}
              </Select>
            </Column>
            <Column>
              <Select
                id="department"
                name="department"
                labelText="Department"
                onChange={handleChange}
                onBlur={handleBlur}
                invalid={!!(touched.department && errors.department)}
                invalidText={errors.department}
              >
                <SelectItem text="--Choose department--" value="" />
                {department?.map((item, index) => (
                  <SelectItem key={index} text={item.name} value={item.departmentId} />
                ))}
              </Select>
            </Column>
            <Column>
              <Select
                id="site"
                name="site"
                labelText="Site"
                onChange={handleChange}
                onBlur={handleBlur}
                invalid={!!(touched.site && errors.site)}
                invalidText={errors.site}
              >
                <SelectItem text="--Choose site--" value="" />
                {site?.map((item, index) => (
                  <SelectItem key={index} text={item.name} value={item.siteId} />
                ))}
              </Select>
            </Column>
            <Column>
              <Select
                id="county"
                name="county"
                labelText="County"
                onChange={handleChange}
                onBlur={handleBlur}
                invalid={!!(touched.county && errors.county)}
                invalidText={errors.county}
              >
                <SelectItem text="--Choose county--" value="" />
                {county?.map((item, index) => (
                  <SelectItem key={index} text={item.name} value={item.countyId} />
                ))}
              </Select>
            </Column>
            <Column>
              <Select
                id="countyBudget"
                name="countyBudget"
                labelText="County budget"
                onChange={handleChange}
                onBlur={handleBlur}
                invalid={!!(touched.countyBudget && errors.countyBudget)}
                invalidText={errors.countyBudget}
              >
                <SelectItem text="--Choose county budget--" value="" />
                {budget?.map((item, index) => (
                  <SelectItem key={index} text={item.name} value={item.budgetId} />
                ))}
              </Select>
            </Column>
            <Column>
              <Select
                id="programArea"
                name="programArea"
                labelText="Program area"
                onChange={handleChange}
                onBlur={handleBlur}
                invalid={!!(touched.programArea && errors.programArea)}
                invalidText={errors.programArea}
              >
                <SelectItem text="--Choose program area--" value="" />
                {program?.map((item, index) => (
                  <SelectItem key={index} text={item.name} value={item.programId} />
                ))}
              </Select>
            </Column>
            <Column>
              <DatePicker
                datePickerType="single"
                onChange={([event]) => setFieldValue('endOfContract', dayjs(event).format('YYYY-MM-DD'))}
              >
                <DatePickerInput
                  id="endOfContract"
                  name="endOfContract"
                  labelText="End of contract"
                  placeholder="mm/dd/yyyy"
                  invalid={!!(touched.endOfContract && errors.endOfContract)}
                  invalidText={errors.endOfContract}
                />
              </DatePicker>
            </Column>
            <Column>
              <DatePicker
                datePickerType="single"
                onChange={([event]) => setFieldValue('dateOfJoining', dayjs(event).format('YYYY-MM-DD'))}
              >
                <DatePickerInput
                  id="dateOfJoining"
                  name="dateOfJoining"
                  labelText="Date of joining"
                  placeholder="mm/dd/yyyy"
                  invalid={!!(touched.dateOfJoining && errors.dateOfJoining)}
                  invalidText={errors.dateOfJoining}
                />
              </DatePicker>
            </Column>
            <Column>
              <DatePicker
                datePickerType="single"
                onChange={([event]) => setFieldValue('dateOfLeaving', dayjs(event).format('YYYY-MM-DD'))}
              >
                <DatePickerInput
                  id="dateOfLeaving"
                  name="dateOfLeaving"
                  labelText="Date of leaving"
                  placeholder="mm/dd/yyyy"
                  invalid={!!(touched.dateOfLeaving && errors.dateOfLeaving)}
                  invalidText={errors.dateOfLeaving}
                />
              </DatePicker>
            </Column>
            <Column>
              <TextInput
                id="jobSpecification"
                name="jobSpecification"
                labelText="Job specification"
                onChange={handleChange}
                onBlur={handleBlur}
                invalid={!!(touched.jobSpecification && errors.jobSpecification)}
                invalidText={errors.jobSpecification}
                value={values.jobSpecification}
              />
            </Column>
            <Column>
              <Button type="submit" className={styles.submitBtn} kind="primary">
                Save
              </Button>
            </Column>
          </Form>
        )}
      </Formik>
    </>
  );
};
