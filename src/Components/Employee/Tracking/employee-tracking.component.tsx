import React, { useState, useMemo, useEffect } from 'react';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import {
  Form,
  Button,
  TextInput,
  DatePicker,
  DatePickerInput,
  Select,
  SelectItem,
  Column,
  ToastNotification,
  Modal,
  Row,
} from 'carbon-components-react';
import { EmployeeTrackingInputProps, FormValues } from './employee-tracking-types';
import { validationSchema } from './employee-tracking-validation';
import { saveEmployeeTrackingInformation, getEmployeeProfileInformation } from './employee-tracking-resource';
import styles from './employee-tracking.module.scss';
import {
  getBudgets,
  getCounties,
  getDepartments,
  getPrograms,
  getProjects,
  getSites,
} from '../../../commonResources/common.resource';
import { Link, useHistory, useParams } from 'react-router-dom';

export const EmployeeTrackingForm: React.FC = () => {
  const [project, setProject] = useState<Array<any>>([]);
  const [department, setDepartment] = useState<Array<any>>();
  const [site, setSite] = useState<Array<any>>();
  const [county, setCounty] = useState<Array<any>>();
  const [budget, setBudget] = useState<Array<any>>();
  const [program, setProgram] = useState<Array<any>>();
  const [formSuccess, setFormSuccess] = useState<boolean>(false);
  const [formError, setFormError] = useState<boolean>(false);
  const [editValues, setEditValues] = useState<Object>();
  const [edited, setEdited] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const history = useHistory();
  const { pfNumber } = useParams<{ pfNumber: string }>();

  useEffect(() => {
    getEmployeeProfileInformation(pfNumber).then((response) => {
      if (response) {
        response.reverse().map((resp) => {
          Object.entries(resp).map((data) => {
            formik.setFieldValue(data[0], data[1]);
            setEditValues(resp);
          });
        });
      }
    });
  }, [pfNumber]);

  const prevUrl = `${history.location.state}`;
  useEffect(() => {
    prevUrl.match(/\/EmployeeRegistration(\/)?$/g) ? setShowModal(true) : setShowModal(false);
  }, [prevUrl]);

  const handleFormSubmit = (values: EmployeeTrackingInputProps) => {
    !editValues && (values.pfNumber = pfNumber);
    saveEmployeeTrackingInformation(values)
      .then((response) => {
        if (response.status === 200) {
          setFormSuccess(true);
          setTimeout(() => setOpen(true), 1000);
          !showModal && setTimeout(() => goToProfile(), 1000);
        }
      })
      .catch((error) => {
        setFormError(true);
      });
  };

  const formik = useFormik({
    initialValues: FormValues,
    onSubmit: handleFormSubmit,
    validationSchema: validationSchema,
  });

  useEffect(() => {
    const entries: Array<{ name: string; sameValue: boolean }> = [];
    editValues &&
      Object.entries(formik.values).map(([key, value]) => {
        Object.entries(editValues)
          .filter(([k]) => k === key)
          .map((v) => {
            const insertedValue =
              key === 'endOfContract' || key === 'dateOfJoining' || key === 'dateOfLeaving'
                ? dayjs(`${value}`).format('YYYY-MM-DD')
                : value;
            const existingValue =
              v[0] === 'endOfContract' || v[0] === 'dateOfJoining' || v[0] === 'dateOfLeaving'
                ? dayjs(`${v[1]}`).format('YYYY-MM-DD')
                : v[1];
            if (existingValue != insertedValue) {
              entries.push({ name: v[0], sameValue: false });
            } else {
              entries.push({ name: v[0], sameValue: true });
            }
          });
      });
    const obj = entries.filter((k) => k.sameValue === false);
    editValues ? (obj.length > 0 ? setEdited(false) : setEdited(true)) : setEdited(false);
  }, [formik.values, editValues]);

  const goToProfile = () => {
    history.push(`/EmployeeProfile/${pfNumber}`);
  };

  const goToNewRegistration = () => {
    history.goBack();
  };

  useMemo(() => {
    getProjects().then((response) => {
      let results = response?.data?.map((resp) => {
        return resp;
      });
      setProject(results);
    });
    getDepartments().then((response) => {
      let results = response?.data?.map((resp) => {
        return resp;
      });
      setDepartment(results);
    });
    getSites().then((response) => {
      let results = response?.data?.map((resp) => {
        return resp;
      });
      setSite(results);
    });
    getCounties().then((response) => {
      let results = response?.data?.map((resp) => {
        return resp;
      });
      setCounty(results);
    });
    getBudgets().then((response) => {
      let results = response?.data?.map((resp) => {
        return resp;
      });
      setBudget(results);
    });
    getPrograms().then((response) => {
      let results = response?.data?.map((resp) => {
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
          timeout={2000}
          subtitle="Employee tracking data saved successfully"
          kind="success"
        />
      )}
      {formError && (
        <ToastNotification
          title="Error saving data"
          className={styles.toast}
          timeout={2000}
          subtitle="Employee tracking data not saved"
          kind="error"
        />
      )}

      <Form className={styles.form} onSubmit={formik.handleSubmit}>
        <Row className={styles.header}>
          <h4>Update Details</h4>
          <Link to={`/EmployeeProfile/${pfNumber}`} className={styles.backBtn}>
            Back
          </Link>
        </Row>
        <Column>
          <Select
            id="project"
            labelText="Project"
            name="project"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            invalid={!!(formik.touched.project && formik.errors.project)}
            invalidText={formik.errors.project}
            value={formik.values.project}
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
            labelText="Department"
            name="department"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            invalid={!!(formik.touched.department && formik.errors.department)}
            invalidText={formik.errors.department}
            value={formik.values.department}
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
            labelText="Site"
            name="site"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            invalid={!!(formik.touched.site && formik.errors.site)}
            invalidText={formik.errors.site}
            value={formik.values.site}
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
            labelText="County"
            name="county"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            invalid={!!(formik.touched.county && formik.errors.county)}
            invalidText={formik.errors.county}
            value={formik.values.county}
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
            labelText="County budget"
            name="countyBudget"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            invalid={!!(formik.touched.countyBudget && formik.errors.countyBudget)}
            invalidText={formik.errors.countyBudget}
            value={formik.values.countyBudget}
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
            labelText="Program area"
            name="programArea"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            invalid={!!(formik.touched.programArea && formik.errors.programArea)}
            invalidText={formik.errors.programArea}
            value={formik.values.programArea}
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
            onChange={([event]) => formik.setFieldValue('endOfContract', new Date(event))}
            onBlur={formik.handleBlur}
            value={dayjs(formik.values.endOfContract).format('MM/DD/YYYY')}
          >
            <DatePickerInput
              id="endOfContract"
              labelText="End of contract"
              name="endOfContract"
              invalid={!!(formik.touched.endOfContract && formik.errors.endOfContract)}
              invalidText={formik.errors.endOfContract}
            />
          </DatePicker>
        </Column>
        <Column>
          <DatePicker
            datePickerType="single"
            onChange={([event]) => formik.setFieldValue('dateOfJoining', new Date(event))}
            onBlur={formik.handleBlur}
            value={dayjs(formik.values.dateOfJoining).format('MM/DD/YYYY')}
          >
            <DatePickerInput
              id="dateOfJoining"
              labelText="Date of joining"
              name="dateOfJoining"
              invalid={!!(formik.touched.dateOfJoining && formik.errors.dateOfJoining)}
              invalidText={formik.errors.dateOfJoining}
            />
          </DatePicker>
        </Column>
        <Column>
          <DatePicker
            datePickerType="single"
            onChange={([event]) => formik.setFieldValue('dateOfLeaving', new Date(event))}
            onBlur={formik.handleBlur}
            value={dayjs(formik.values.dateOfLeaving).format('MM/DD/YYYY')}
          >
            <DatePickerInput
              id="dateOfLeaving"
              labelText="Date of leaving"
              name="dateOfLeaving"
              invalid={!!(formik.touched.dateOfLeaving && formik.errors.dateOfLeaving)}
              invalidText={formik.errors.dateOfLeaving}
            />
          </DatePicker>
        </Column>
        <Column>
          <TextInput
            id="jobSpecification"
            labelText="Job specification"
            name="jobSpecification"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            invalid={!!(formik.touched.jobSpecification && formik.errors.jobSpecification)}
            invalidText={formik.errors.jobSpecification}
            value={formik.values.jobSpecification}
          />
        </Column>
        <Column>
          <Button type="submit" className={styles.submitBtn} disabled={edited} kind="primary">
            Save
          </Button>
          <Modal
            open={showModal && open}
            onRequestClose={(e) => {
              setOpen(false);
              goToProfile;
            }}
            passiveModal
            preventCloseOnClickOutside
            modalHeading="Registration successfully completed"
          >
            <p>Would you like to start a new registration or continue to the employee profile?</p>
            <div className={styles.modalBtn}>
              <Button onClick={goToNewRegistration} className={styles.registerBtn}>
                Start a new registration?
              </Button>
              <Button kind="tertiary" onClick={goToProfile} className={styles.continueBtn}>
                Continue to profile?
              </Button>
            </div>
          </Modal>
        </Column>
      </Form>
    </>
  );
};
